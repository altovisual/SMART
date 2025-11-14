# 🔧 SmartPay - Technical Implementation Guide

## 🎯 Core Requirements Implementation

### 1. Wallet-Less Checkout Flow

#### Backend: Custodial Wallet Service

```sql
-- Database schema for custodial wallets
CREATE TABLE custodial_wallets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  address VARCHAR(42) NOT NULL,
  encrypted_private_key TEXT NOT NULL,
  blockchain VARCHAR(20) DEFAULT 'ethereum',
  balance DECIMAL(20, 8) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_wallets_user ON custodial_wallets(user_id);
CREATE INDEX idx_wallets_address ON custodial_wallets(address);
```

#### Supabase Edge Function

```typescript
// supabase/functions/create-wallet/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { ethers } from 'npm:ethers@6.7.0'

serve(async (req) => {
  const { userId } = await req.json()
  
  // Generate new wallet
  const wallet = ethers.Wallet.createRandom()
  
  // Encrypt private key
  const encrypted = await encryptPrivateKey(
    wallet.privateKey,
    process.env.ENCRYPTION_KEY
  )
  
  // Store in database
  const { data, error } = await supabase
    .from('custodial_wallets')
    .insert({
      user_id: userId,
      address: wallet.address,
      encrypted_private_key: encrypted
    })
  
  return new Response(JSON.stringify({
    address: wallet.address
  }))
})
```

### 2. Unified Payment Flow

#### Payment Orchestrator Service

```javascript
// src/services/paymentOrchestrator.js

export class PaymentOrchestrator {
  constructor() {
    this.providers = {
      crypto: new CryptoProvider(),
      card: new StripeProvider(),
      bank: new PlaidProvider()
    }
  }

  async processPayment(paymentRequest) {
    const { amount, method, userId, metadata } = paymentRequest
    
    // 1. Risk analysis
    const riskAnalysis = await this.analyzeRisk(paymentRequest)
    if (riskAnalysis.action === 'decline') {
      throw new Error('Transaction declined due to risk')
    }
    
    // 2. Calculate fees
    const fees = await this.calculateFees(amount, method)
    
    // 3. Process payment through appropriate provider
    const provider = this.providers[method]
    const result = await provider.process({
      amount: amount + fees.total,
      userId,
      metadata
    })
    
    // 4. Record transaction
    await this.recordTransaction({
      ...result,
      fees,
      riskScore: riskAnalysis.score
    })
    
    // 5. Trigger settlement if merchant
    if (metadata.merchantId) {
      await this.triggerSettlement(metadata.merchantId, result)
    }
    
    return result
  }

  async calculateFees(amount, method) {
    const feeStructure = {
      crypto: {
        processing: amount * 0.01, // 1%
        network: await this.getNetworkFee(),
        spread: amount * 0.005 // 0.5%
      },
      card: {
        processing: amount * 0.029 + 0.30, // Stripe-like
        network: 0,
        spread: 0
      },
      bank: {
        processing: Math.min(amount * 0.008, 5.00),
        network: 0,
        spread: 0
      }
    }
    
    const fees = feeStructure[method]
    fees.total = Object.values(fees).reduce((a, b) => a + b, 0)
    
    return fees
  }
}
```

### 3. Real-Time Fee Updates

```javascript
// src/hooks/useRealTimeFees.js

export const useRealTimeFees = (amount, method) => {
  const [fees, setFees] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let interval

    const fetchFees = async () => {
      try {
        const response = await fetch('/api/calculate-fees', {
          method: 'POST',
          body: JSON.stringify({ amount, method })
        })
        const data = await response.json()
        setFees(data)
        setLoading(false)
      } catch (error) {
        console.error('Fee calculation error:', error)
      }
    }

    // Initial fetch
    fetchFees()

    // Update every 5 seconds
    interval = setInterval(fetchFees, 5000)

    return () => clearInterval(interval)
  }, [amount, method])

  return { fees, loading }
}

// Usage in component
const CheckoutPage = () => {
  const { fees, loading } = useRealTimeFees(100, 'crypto')
  
  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <FeeBreakdown fees={fees} />
      )}
    </div>
  )
}
```

### 4. Social Authentication

```javascript
// src/services/authService.jsx - Enhanced

export const authProviders = {
  google: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
    return data
  },

  apple: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return data
  },

  magicLink: async (email) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: true
      }
    })
    return data
  }
}

// Modern auth component
const ModernAuth = () => {
  return (
    <div className="auth-container">
      <h1>Welcome to SmartPay</h1>
      
      {/* Social buttons */}
      <button 
        className="auth-btn apple"
        onClick={() => authProviders.apple()}
      >
        <AppleIcon /> Continue with Apple
      </button>
      
      <button 
        className="auth-btn google"
        onClick={() => authProviders.google()}
      >
        <GoogleIcon /> Continue with Google
      </button>
      
      <div className="divider">or</div>
      
      {/* Email */}
      <input 
        type="email" 
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <button onClick={() => authProviders.magicLink(email)}>
        Continue with Email
      </button>
      
      <p className="hint">
        We'll send you a secure link to sign in
      </p>
    </div>
  )
}
```

### 5. Transaction Management & Refunds

```javascript
// src/services/transactionService.js

export class TransactionService {
  async getTransactions(filters) {
    let query = supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters.status !== 'all') {
      query = query.eq('status', filters.status)
    }

    if (filters.method !== 'all') {
      query = query.eq('payment_method', filters.method)
    }

    if (filters.dateRange) {
      const { start, end } = this.parseDateRange(filters.dateRange)
      query = query.gte('created_at', start).lte('created_at', end)
    }

    const { data, error } = await query
    return data
  }

  async initiateRefund(transactionId, amount, reason) {
    // 1. Validate transaction
    const transaction = await this.getTransaction(transactionId)
    
    if (!this.canRefund(transaction)) {
      throw new Error('Transaction not eligible for refund')
    }

    // 2. Create refund record
    const { data: refund } = await supabase
      .from('refunds')
      .insert({
        transaction_id: transactionId,
        amount,
        reason,
        status: 'pending'
      })
      .select()
      .single()

    // 3. Process refund based on payment method
    try {
      switch (transaction.payment_method) {
        case 'crypto':
          await this.processCryptoRefund(transaction, amount)
          break
        case 'card':
          await this.processCardRefund(transaction, amount)
          break
        case 'bank':
          await this.processBankRefund(transaction, amount)
          break
      }

      // 4. Update status
      await supabase
        .from('refunds')
        .update({ status: 'completed' })
        .eq('id', refund.id)

      // 5. Notify user
      await this.sendRefundNotification(transaction.user_id, refund)

      return refund
    } catch (error) {
      await supabase
        .from('refunds')
        .update({ status: 'failed', error: error.message })
        .eq('id', refund.id)
      
      throw error
    }
  }

  canRefund(transaction) {
    // Business rules
    const daysSinceTransaction = (Date.now() - new Date(transaction.created_at)) / (1000 * 60 * 60 * 24)
    
    return (
      transaction.status === 'completed' &&
      !transaction.refunded &&
      daysSinceTransaction <= 30 // 30-day refund window
    )
  }
}
```

### 6. AI Trust Layer (Simulated)

```javascript
// src/services/aiTrustLayer.js

export class AITrustLayer {
  async analyzeTransaction(transaction) {
    const analysis = {
      riskScore: 0,
      flags: [],
      recommendation: 'approve',
      confidence: 0,
      factors: {}
    }

    // Factor 1: Amount analysis
    analysis.factors.amount = await this.analyzeAmount(transaction)
    
    // Factor 2: Velocity check
    analysis.factors.velocity = await this.checkVelocity(transaction.user_id)
    
    // Factor 3: Location risk
    analysis.factors.location = await this.analyzeLocation(transaction.ip_address)
    
    // Factor 4: Device fingerprint
    analysis.factors.device = await this.analyzeDevice(transaction.device_id)
    
    // Factor 5: Behavioral patterns
    analysis.factors.behavior = await this.analyzeBehavior(transaction.user_id)

    // Calculate composite risk score (weighted average)
    analysis.riskScore = (
      analysis.factors.amount * 0.30 +
      analysis.factors.velocity * 0.25 +
      analysis.factors.location * 0.20 +
      analysis.factors.device * 0.15 +
      analysis.factors.behavior * 0.10
    )

    // Add flags
    if (analysis.factors.amount > 80) {
      analysis.flags.push({
        type: 'high_amount',
        severity: 'high',
        message: 'Transaction amount significantly higher than user average'
      })
    }

    if (analysis.factors.velocity > 70) {
      analysis.flags.push({
        type: 'unusual_velocity',
        severity: 'medium',
        message: 'Multiple transactions in short time period'
      })
    }

    // Determine recommendation
    if (analysis.riskScore < 30) {
      analysis.recommendation = 'approve'
      analysis.confidence = 0.95
    } else if (analysis.riskScore < 70) {
      analysis.recommendation = 'review'
      analysis.confidence = 0.75
    } else {
      analysis.recommendation = 'decline'
      analysis.confidence = 0.90
    }

    // Log for ML training
    await this.logAnalysis(transaction.id, analysis)

    return analysis
  }

  async analyzeAmount(transaction) {
    // Get user's transaction history
    const { data: history } = await supabase
      .from('transactions')
      .select('amount')
      .eq('user_id', transaction.user_id)
      .eq('status', 'completed')

    if (history.length === 0) return 50 // New user, moderate risk

    const avgAmount = history.reduce((sum, t) => sum + t.amount, 0) / history.length
    const stdDev = this.calculateStdDev(history.map(t => t.amount))

    // Z-score: how many standard deviations from mean
    const zScore = (transaction.amount - avgAmount) / stdDev

    // Convert to 0-100 scale
    return Math.min(Math.abs(zScore) * 20, 100)
  }

  async checkVelocity(userId) {
    // Count transactions in last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    
    const { count } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', oneHourAgo.toISOString())

    // Risk increases with transaction count
    return Math.min(count * 20, 100)
  }

  async predictChargebackRisk(transaction) {
    // Simulated ML model
    const features = {
      cardType: transaction.card_type,
      amount: transaction.amount,
      merchantCategory: transaction.merchant_category,
      customerAge: await this.getCustomerAge(transaction.user_id),
      transactionHour: new Date(transaction.created_at).getHours(),
      isInternational: transaction.is_international
    }

    // Simplified risk calculation (replace with real ML model)
    let risk = 0

    if (features.amount > 500) risk += 0.2
    if (features.isInternational) risk += 0.3
    if (features.transactionHour < 6 || features.transactionHour > 22) risk += 0.1
    if (features.customerAge < 30) risk += 0.1

    return {
      probability: Math.min(risk, 1),
      risk: risk > 0.7 ? 'high' : risk > 0.4 ? 'medium' : 'low',
      factors: Object.entries(features).map(([key, value]) => ({
        factor: key,
        value,
        impact: this.calculateFactorImpact(key, value)
      }))
    }
  }
}
```

### 7. KYC Workflow

```javascript
// src/components/kyc/KYCFlow.jsx

const KYCFlow = () => {
  const [step, setStep] = useState(1)
  const [kycData, setKycData] = useState({})

  const steps = [
    {
      id: 1,
      title: 'Personal Information',
      fields: ['firstName', 'lastName', 'dateOfBirth', 'ssn']
    },
    {
      id: 2,
      title: 'Address Verification',
      fields: ['street', 'city', 'state', 'zipCode', 'country']
    },
    {
      id: 3,
      title: 'Identity Documents',
      component: <DocumentUpload />
    },
    {
      id: 4,
      title: 'Selfie Verification',
      component: <SelfieCapture />
    },
    {
      id: 5,
      title: 'Review & Submit',
      component: <KYCReview data={kycData} />
    }
  ]

  const handleSubmit = async () => {
    // Upload documents to Supabase Storage
    const documentUrls = await uploadDocuments(kycData.documents)
    
    // Create KYC submission
    const { data, error } = await supabase
      .from('kyc_submissions')
      .insert({
        user_id: currentUser.id,
        personal_info: kycData.personalInfo,
        address: kycData.address,
        document_urls: documentUrls,
        selfie_url: kycData.selfieUrl,
        status: 'pending',
        submitted_at: new Date()
      })

    // Simulate verification (in production: Alloy, Onfido, etc.)
    await simulateKYCVerification(data.id)
  }

  return (
    <div className="kyc-flow">
      <ProgressIndicator current={step} total={steps.length} />
      
      <div className="step-content">
        {renderStep(steps[step - 1])}
      </div>

      <div className="navigation">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)}>Back</button>
        )}
        <button onClick={() => handleNext()}>
          {step === steps.length ? 'Submit' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
```

### 8. Fiat Settlement System

```javascript
// src/services/settlementService.js

export class SettlementService {
  async createSettlement(merchantId) {
    // Get unsettled transactions
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('settled', false)
      .eq('status', 'completed')

    if (transactions.length === 0) {
      return null
    }

    // Calculate settlement
    const grossAmount = transactions.reduce((sum, t) => sum + t.amount, 0)
    const fees = this.calculateSettlementFees(transactions)
    const netAmount = grossAmount - fees

    // Create settlement record
    const { data: settlement } = await supabase
      .from('settlements')
      .insert({
        merchant_id: merchantId,
        transaction_ids: transactions.map(t => t.id),
        gross_amount: grossAmount,
        fees,
        net_amount: netAmount,
        currency: 'USD',
        status: 'pending',
        scheduled_date: this.getNextSettlementDate()
      })
      .select()
      .single()

    // Mark transactions as settled
    await supabase
      .from('transactions')
      .update({ settled: true, settlement_id: settlement.id })
      .in('id', transactions.map(t => t.id))

    // Simulate bank transfer (in production: Stripe Connect, Dwolla)
    await this.simulateBankTransfer(merchantId, netAmount)

    return settlement
  }

  calculateSettlementFees(transactions) {
    return transactions.reduce((total, t) => {
      const feeRate = t.payment_method === 'crypto' ? 0.01 : 0.029
      return total + (t.amount * feeRate)
    }, 0)
  }

  async simulateBankTransfer(merchantId, amount) {
    // Get merchant bank details
    const { data: merchant } = await supabase
      .from('merchants')
      .select('bank_account')
      .eq('id', merchantId)
      .single()

    // Simulate transfer (2-3 business days)
    console.log(`Simulating transfer of $${amount} to account ${merchant.bank_account}`)
    
    // In production, integrate with:
    // - Stripe Connect
    // - Dwolla
    // - Plaid
    // - Banking APIs
  }
}
```

---

## 🎨 UI Components (Apple Pay Style)

### Modern Checkout Component

```javascript
// src/components/checkout/ModernCheckout.jsx

const ModernCheckout = ({ amount, items }) => {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const { fees, loading } = useRealTimeFees(amount, selectedMethod)

  return (
    <div className="modern-checkout">
      {/* Header */}
      <div className="checkout-header">
        <h1>Checkout</h1>
        <button className="close-btn">×</button>
      </div>

      {/* Order summary */}
      <OrderSummary items={items} />

      {/* Quick pay buttons */}
      <div className="quick-pay">
        <ApplePayButton />
        <GooglePayButton />
      </div>

      <div className="divider">or pay with</div>

      {/* Payment methods */}
      <PaymentMethodGrid
        methods={['crypto', 'card', 'bank']}
        selected={selectedMethod}
        onSelect={setSelectedMethod}
      />

      {/* Cost breakdown */}
      {selectedMethod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CostBreakdown
            subtotal={amount}
            fees={fees}
            loading={loading}
          />
        </motion.div>
      )}

      {/* Pay button */}
      <button
        className="pay-button"
        disabled={!selectedMethod}
        onClick={handlePay}
      >
        Pay ${(amount + (fees?.total || 0)).toFixed(2)}
      </button>

      {/* Trust badges */}
      <TrustBadges />
    </div>
  )
}
```

---

## 📊 Database Schema Updates

```sql
-- Enhanced transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  merchant_id UUID REFERENCES merchants(id),
  amount DECIMAL(20, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(20) NOT NULL, -- 'crypto', 'card', 'bank'
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  fees JSONB, -- {processing: 0, network: 0, spread: 0, total: 0}
  risk_score INTEGER, -- 0-100
  risk_flags JSONB, -- [{type: '', severity: '', message: ''}]
  settled BOOLEAN DEFAULT FALSE,
  settlement_id UUID REFERENCES settlements(id),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Refunds table
CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id UUID REFERENCES transactions(id),
  amount DECIMAL(20, 2) NOT NULL,
  reason VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  initiated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Settlements table
CREATE TABLE settlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id),
  transaction_ids UUID[],
  gross_amount DECIMAL(20, 2),
  fees DECIMAL(20, 2),
  net_amount DECIMAL(20, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) DEFAULT 'pending',
  scheduled_date DATE,
  completed_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- KYC submissions
CREATE TABLE kyc_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  personal_info JSONB,
  address JSONB,
  document_urls JSONB,
  selfie_url TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'under_review', 'approved', 'rejected'
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP,
  submitted_at TIMESTAMP DEFAULT NOW()
);
```

---

**Status**: 🟢 Ready for Implementation  
**Priority**: Follow Phase 1 → Phase 2 → Phase 3  
**Timeline**: 16 weeks to full MVP
