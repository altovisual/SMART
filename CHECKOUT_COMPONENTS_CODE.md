# 🛒 Código de Componentes de Checkout

## ✅ Componentes Completados

### 1. AppleCheckout.jsx (Mejorado) ✅
- Ubicación: `src/pages/AppleCheckout.jsx`
- Estado: Completado y mejorado
- Funcionalidad: Selección de método de pago

---

## 📝 Componentes a Crear

### 2. CryptoPayment.jsx

**Ubicación:** `src/pages/Checkout/CryptoPayment.jsx`

```javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowLeft, Copy, CheckCircle2, Bitcoin, Wallet } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function CryptoPayment() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [copied, setCopied] = useState(false);

  const cryptos = [
    { id: 'BTC', name: 'Bitcoin', icon: Bitcoin },
    { id: 'ETH', name: 'Ethereum', icon: Wallet },
    { id: 'USDT', name: 'Tether', icon: Wallet }
  ];

  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    navigate('/checkout/success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/checkout')}
        className={\`flex items-center gap-2 mb-6 \${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}\`}
      >
        <ArrowLeft size={20} />
        Back to Checkout
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className={\`text-3xl font-bold mb-2 \${isDark ? 'text-white' : 'text-black'}\`}>
          Cryptocurrency Payment
        </h1>
        <p className={\`text-sm \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
          Send the exact amount to complete your payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Crypto Selector */}
          <div className={\`p-6 rounded-apple-lg mb-6 \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}\`}>
            <h3 className={\`font-semibold mb-4 \${isDark ? 'text-white' : 'text-black'}\`}>
              Select Cryptocurrency
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {cryptos.map(crypto => {
                const Icon = crypto.icon;
                return (
                  <button
                    key={crypto.id}
                    onClick={() => setSelectedCrypto(crypto.id)}
                    className={\`p-4 rounded-apple text-center transition-all \${selectedCrypto === crypto.id ? 'bg-orange-500 text-white' : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}\`}
                  >
                    <Icon size={24} className="mx-auto mb-2" />
                    <span className="text-xs font-semibold">{crypto.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wallet Address */}
          <div className={\`p-6 rounded-apple-lg \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}\`}>
            <h3 className={\`font-semibold mb-4 \${isDark ? 'text-white' : 'text-black'}\`}>
              Wallet Address
            </h3>
            <div className={\`p-4 rounded-apple mb-3 \${isDark ? 'bg-white/5' : 'bg-gray-100'}\`}>
              <p className={\`text-sm font-mono break-all \${isDark ? 'text-white' : 'text-black'}\`}>
                {walletAddress}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className={\`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 \${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}\`}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Address'}
            </button>
          </div>
        </div>

        {/* Right Column - QR Code */}
        <div className={\`p-6 rounded-apple-lg \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}\`}>
          <h3 className={\`font-semibold mb-4 text-center \${isDark ? 'text-white' : 'text-black'}\`}>
            Scan QR Code
          </h3>
          <div className="bg-white p-6 rounded-apple mb-6 flex items-center justify-center">
            <QRCodeSVG value={walletAddress} size={200} />
          </div>
          
          <div className={\`p-4 rounded-apple mb-4 \${isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'}\`}>
            <p className={\`text-sm font-semibold mb-1 \${isDark ? 'text-white' : 'text-black'}\`}>
              Amount to Send
            </p>
            <p className="text-2xl font-bold text-orange-500">
              0.00234 BTC
            </p>
            <p className={\`text-xs mt-1 \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
              ≈ $107.99 USD
            </p>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-3 rounded-apple font-semibold bg-orange-500 hover:bg-orange-600 text-white active:scale-95 transition-all"
          >
            I've Sent the Payment
          </button>
        </div>
      </div>
    </div>
  );
}
\`\`\`

---

### 3. CardPayment.jsx

**Ubicación:** \`src/pages/Checkout/CardPayment.jsx\`

```javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

export default function CardPayment() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout/success');
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || value;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate('/checkout')}
        className={\`flex items-center gap-2 mb-6 \${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}\`}
      >
        <ArrowLeft size={20} />
        Back to Checkout
      </button>

      <div className="mb-8">
        <h1 className={\`text-3xl font-bold mb-2 \${isDark ? 'text-white' : 'text-black'}\`}>
          Card Payment
        </h1>
        <p className={\`text-sm \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
          Enter your card details to complete payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className={\`p-6 rounded-apple-lg \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}\`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={\`block text-sm font-medium mb-2 \${isDark ? 'text-gray-300' : 'text-gray-700'}\`}>
                Card Number
              </label>
              <input
                type="text"
                maxLength="19"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(cardData.number)}
                onChange={(e) => setCardData({...cardData, number: e.target.value.replace(/\s/g, '')})}
                className={\`w-full px-4 py-3 rounded-apple \${isDark ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-black'}\`}
              />
            </div>

            <div>
              <label className={\`block text-sm font-medium mb-2 \${isDark ? 'text-gray-300' : 'text-gray-700'}\`}>
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="JOHN DOE"
                value={cardData.name}
                onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                className={\`w-full px-4 py-3 rounded-apple \${isDark ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-black'}\`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={\`block text-sm font-medium mb-2 \${isDark ? 'text-gray-300' : 'text-gray-700'}\`}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  maxLength="5"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                  className={\`w-full px-4 py-3 rounded-apple \${isDark ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-black'}\`}
                />
              </div>
              <div>
                <label className={\`block text-sm font-medium mb-2 \${isDark ? 'text-gray-300' : 'text-gray-700'}\`}>
                  CVV
                </label>
                <input
                  type="text"
                  maxLength="3"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                  className={\`w-full px-4 py-3 rounded-apple \${isDark ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-50 border border-gray-200 text-black'}\`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-apple font-semibold bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Lock size={18} />
              Pay $107.99
            </button>
          </form>
        </div>

        {/* Card Preview */}
        <div className={\`p-6 rounded-apple-lg \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}\`}>
          <h3 className={\`font-semibold mb-4 \${isDark ? 'text-white' : 'text-black'}\`}>
            Card Preview
          </h3>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-apple-lg p-6 text-white aspect-video flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <CreditCard size={32} />
              <span className="text-xs">VISA</span>
            </div>
            <div>
              <p className="text-lg font-mono mb-4">
                {formatCardNumber(cardData.number) || '•••• •••• •••• ••••'}
              </p>
              <div className="flex justify-between">
                <div>
                  <p className="text-xs opacity-70">Cardholder</p>
                  <p className="text-sm font-semibold">{cardData.name || 'YOUR NAME'}</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">Expires</p>
                  <p className="text-sm font-semibold">{cardData.expiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 4. BankPayment.jsx

**Ubicación:** `src/pages/Checkout/BankPayment.jsx`

```javascript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ArrowLeft, Building2, Copy, CheckCircle2 } from "lucide-react";

export default function BankPayment() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [copied, setCopied] = useState('');

  const bankDetails = {
    bankName: 'SmartPay Bank',
    accountNumber: '1234567890',
    routingNumber: '987654321',
    accountName: 'SmartPay Inc.',
    reference: 'SP-' + Date.now()
  };

  const handleCopy = (field, value) => {
    navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate('/checkout')}
        className={\`flex items-center gap-2 mb-6 \${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}\`}
      >
        <ArrowLeft size={20} />
        Back to Checkout
      </button>

      <div className="mb-8">
        <h1 className={\`text-3xl font-bold mb-2 \${isDark ? 'text-white' : 'text-black'}\`}>
          Bank Transfer
        </h1>
        <p className={\`text-sm \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
          Transfer the exact amount to the bank account below
        </p>
      </div>

      <div className={\`p-6 rounded-apple-lg mb-6 \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'}\`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-apple bg-green-500/10">
            <Building2 size={24} className="text-green-500" />
          </div>
          <div>
            <h3 className={\`font-semibold \${isDark ? 'text-white' : 'text-black'}\`}>
              Bank Details
            </h3>
            <p className={\`text-sm \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
              Use these details for your transfer
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(bankDetails).map(([key, value]) => (
            <div key={key} className={\`p-4 rounded-apple \${isDark ? 'bg-white/5' : 'bg-gray-50'}\`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className={\`text-xs mb-1 \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
                    {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                  </p>
                  <p className={\`font-semibold \${isDark ? 'text-white' : 'text-black'}\`}>
                    {value}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(key, value)}
                  className={\`p-2 rounded-apple \${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-200'}\`}
                >
                  {copied === key ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} className={\`\${isDark ? 'text-gray-400' : 'text-gray-600'}\`} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={\`mt-6 p-4 rounded-apple \${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}\`}>
          <p className={\`text-sm font-semibold mb-1 \${isDark ? 'text-white' : 'text-black'}\`}>
            Amount to Transfer
          </p>
          <p className="text-2xl font-bold text-green-500">
            $107.99
          </p>
        </div>

        <button
          onClick={() => navigate('/checkout/success')}
          className="w-full mt-6 py-3 rounded-apple font-semibold bg-green-500 hover:bg-green-600 text-white active:scale-95 transition-all"
        >
          I've Completed the Transfer
        </button>
      </div>
    </div>
  );
}
```

---

### 5. PaymentSuccess.jsx

**Ubicación:** `src/pages/Checkout/PaymentSuccess.jsx`

```javascript
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { CheckCircle2, Download, Home } from "lucide-react";

export default function PaymentSuccess() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const transactionId = 'TXN-' + Date.now();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className={\`max-w-md w-full p-8 rounded-apple-xl text-center \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'} animate-slide-up\`}>
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        
        <h1 className={\`text-3xl font-bold mb-2 \${isDark ? 'text-white' : 'text-black'}\`}>
          Payment Successful!
        </h1>
        <p className={\`text-sm mb-6 \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
          Your payment has been processed successfully
        </p>

        <div className={\`p-4 rounded-apple mb-6 \${isDark ? 'bg-white/5' : 'bg-gray-50'}\`}>
          <p className={\`text-xs mb-1 \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
            Transaction ID
          </p>
          <p className={\`font-mono font-semibold \${isDark ? 'text-white' : 'text-black'}\`}>
            {transactionId}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 rounded-apple font-semibold bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Home size={18} />
            Go to Dashboard
          </button>
          <button
            className={\`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all \${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}\`}
          >
            <Download size={18} />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### 6. PaymentError.jsx

**Ubicación:** `src/pages/Checkout/PaymentError.jsx`

```javascript
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { XCircle, RotateCcw, MessageCircle } from "lucide-react";

export default function PaymentError() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className={\`max-w-md w-full p-8 rounded-apple-xl text-center \${isDark ? 'bg-[#252526]' : 'bg-white'} border \${isDark ? 'border-[#3e3e42]' : 'border-gray-200'} animate-slide-up\`}>
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-red-500" />
        </div>
        
        <h1 className={\`text-3xl font-bold mb-2 \${isDark ? 'text-white' : 'text-black'}\`}>
          Payment Failed
        </h1>
        <p className={\`text-sm mb-6 \${isDark ? 'text-gray-400' : 'text-gray-600'}\`}>
          We couldn't process your payment. Please try again.
        </p>

        <div className={\`p-4 rounded-apple mb-6 \${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}\`}>
          <p className={\`text-sm \${isDark ? 'text-white' : 'text-black'}\`}>
            <strong>Error:</strong> Insufficient funds
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3 rounded-apple font-semibold bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
          <button
            className={\`w-full py-3 rounded-apple font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all \${isDark ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}\`}
          >
            <MessageCircle size={18} />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

## 🗺️ Rutas a Agregar en AppRouter.jsx

```javascript
// Importar componentes
import CryptoPayment from "../pages/Checkout/CryptoPayment";
import CardPayment from "../pages/Checkout/CardPayment";
import BankPayment from "../pages/Checkout/BankPayment";
import PaymentSuccess from "../pages/Checkout/PaymentSuccess";
import PaymentError from "../pages/Checkout/PaymentError";

// Agregar rutas dentro de UserRoute
<Route path="/checkout/crypto" element={<MainLayout><CryptoPayment /></MainLayout>} />
<Route path="/checkout/card" element={<MainLayout><CardPayment /></MainLayout>} />
<Route path="/checkout/bank" element={<MainLayout><BankPayment /></MainLayout>} />
<Route path="/checkout/success" element={<MainLayout><PaymentSuccess /></MainLayout>} />
<Route path="/checkout/error" element={<MainLayout><PaymentError /></MainLayout>} />
```

---

## ✅ Checklist de Implementación

- [x] AppleCheckout.jsx mejorado
- [ ] Crear carpeta `src/pages/Checkout/`
- [ ] Crear CryptoPayment.jsx
- [ ] Crear CardPayment.jsx
- [ ] Crear BankPayment.jsx
- [ ] Crear PaymentSuccess.jsx
- [ ] Crear PaymentError.jsx
- [ ] Actualizar AppRouter.jsx con nuevas rutas
- [ ] Probar flujo completo

---

**Status**: 📝 Código Completo - Listo para Copiar y Pegar
