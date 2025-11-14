# 🗺️ Mapa Completo de Navegación - SMART Pay

## 📍 Rutas Principales

### **Autenticación**
```
/ → Login/Signup (ModernAuth2Col)
/merchant → Merchant Login (ModernAuth2Col)
```

### **Usuario**
```
/dashboard → User Dashboard (PaymentDashboard)
/checkout → Checkout (AppleCheckout)
/checkout/crypto → Crypto Payment
/checkout/card → Card Payment
/checkout/bank → Bank Payment
/checkout/success → Payment Success
/checkout/error → Payment Error
```

### **Comerciante**
```
/merchant/dashboard → Merchant Dashboard (ModernMerchantDashboard)
```

---

## 🧭 Navegación desde Componentes

### **1. Navbar (AppleNavBar)**

**Links Disponibles:**
```javascript
✅ Dashboard → /dashboard
✅ Checkout → /checkout
```

**User Menu:**
```javascript
✅ Profile → (Por implementar)
✅ Settings → (Por implementar)
✅ Logout → / (Login)
```

**Theme Toggle:**
```javascript
✅ Dark/Light Mode
```

---

### **2. Dashboard (PaymentDashboard)**

**Quick Actions:**
```javascript
✅ New Payment → /checkout
   - Botón principal azul
   - Icono: CreditCard
   - Texto: "Pay with crypto or card"

⚠️ Connect Wallet → (Por implementar)
   - Botón secundario
   - Icono: Wallet
   - Texto: "Link your crypto wallet"
```

**Stats Cards (Clickeable):**
```javascript
✅ Total Spent → Abre StatsDetailModal
✅ Rewards Earned → Abre StatsDetailModal
✅ Transactions → Abre StatsDetailModal
✅ Success Rate → Abre StatsDetailModal
```

**Transaction List (Clickeable):**
```javascript
✅ Click en transacción → Abre TransactionDetailModal
```

---

### **3. Checkout (AppleCheckout)**

**Payment Methods:**
```javascript
✅ Cryptocurrency → /checkout/crypto
   - Color: Orange
   - Fee: 1.5%
   - Time: ~2 minutes
   
✅ Credit or Debit Card → /checkout/card
   - Color: Blue
   - Fee: 2.9% + $0.30
   - Time: Instant
   
✅ Bank Transfer → /checkout/bank
   - Color: Green
   - Fee: 0.8%
   - Time: 1-3 business days
```

**Navigation:**
```javascript
✅ Pay Button → Navega a método seleccionado
```

---

### **4. CryptoPayment**

**Navigation:**
```javascript
✅ Back Button → /checkout
✅ I've Sent Payment → /checkout/success
```

**Features:**
```javascript
✅ Crypto Selector (BTC, ETH, USDT)
✅ QR Code
✅ Copy Wallet Address
✅ Amount Display
```

---

### **5. CardPayment**

**Navigation:**
```javascript
✅ Back Button → /checkout
✅ Pay Button → /checkout/success
```

**Features:**
```javascript
✅ Card Number Input (auto-format)
✅ Cardholder Name
✅ Expiry Date (MM/YY)
✅ CVV
✅ Live Card Preview
```

---

### **6. BankPayment**

**Navigation:**
```javascript
✅ Back Button → /checkout
✅ I've Completed Transfer → /checkout/success
```

**Features:**
```javascript
✅ Bank Details Display
✅ Copy Each Field
✅ Reference Number
✅ Amount Display
```

---

### **7. PaymentSuccess**

**Navigation:**
```javascript
✅ Go to Dashboard → /dashboard
✅ Download Receipt → window.print()
✅ Make Another Payment → /checkout
```

**Features:**
```javascript
✅ Transaction ID
✅ Amount Paid
✅ Date & Time
✅ Success Animation
```

---

### **8. PaymentError**

**Navigation:**
```javascript
✅ Try Again → /checkout
✅ Go to Dashboard → /dashboard
✅ Contact Support → Alert
```

**Features:**
```javascript
✅ Error Code
✅ Error Message
✅ Timestamp
✅ Error Animation
```

---

### **9. MerchantDashboard**

**Navigation:**
```javascript
✅ Navbar Links (Same as User)
✅ QR Code Modal
```

**Features:**
```javascript
✅ Stats Cards
✅ Sales Chart (Recharts)
✅ Recent Transactions
✅ QR Code for Payments
```

---

## 🔄 Flujo Completo de Usuario

### **Flujo de Pago Exitoso:**
```
1. Login (/) 
   ↓ Credenciales correctas
2. Dashboard (/dashboard)
   ↓ Click "New Payment"
3. Checkout (/checkout)
   ↓ Seleccionar método (ej: Crypto)
4. CryptoPayment (/checkout/crypto)
   ↓ Escanear QR / Copiar dirección
   ↓ Enviar pago
   ↓ Click "I've Sent Payment"
5. PaymentSuccess (/checkout/success)
   ↓ Ver detalles
   ↓ Opciones:
   ├─→ Dashboard
   ├─→ Download Receipt
   └─→ New Payment
```

### **Flujo de Pago con Error:**
```
1-4. (Mismo que arriba)
5. PaymentError (/checkout/error)
   ↓ Ver error
   ↓ Opciones:
   ├─→ Try Again (Checkout)
   ├─→ Dashboard
   └─→ Contact Support
```

---

## 🎯 Navegación Rápida

### **Desde cualquier página:**
```javascript
✅ Logo "SMART" → /dashboard
✅ Dashboard Link → /dashboard
✅ Checkout Link → /checkout
✅ Theme Toggle → Cambiar tema
✅ User Menu → Profile, Settings, Logout
```

### **Atajos de Teclado (Futuros):**
```javascript
⚠️ Ctrl + D → Dashboard
⚠️ Ctrl + P → New Payment
⚠️ Ctrl + T → Toggle Theme
⚠️ Esc → Close Modal
```

---

## 📱 Navegación Móvil

### **Hamburger Menu (Mobile):**
```javascript
⚠️ Por implementar
- Dashboard
- Checkout
- Profile
- Settings
- Logout
```

---

## 🔐 Rutas Protegidas

### **PublicRoute (No autenticado):**
```javascript
✅ / → Login
✅ /merchant → Merchant Login
```

### **UserRoute (Usuario autenticado):**
```javascript
✅ /dashboard
✅ /checkout
✅ /checkout/*
```

### **MerchantRoute (Comerciante autenticado):**
```javascript
✅ /merchant/dashboard
```

---

## ✅ Estado Actual

### **Completado:**
- ✅ Login/Signup
- ✅ Dashboard
- ✅ Checkout completo
- ✅ Payment methods (3)
- ✅ Success/Error pages
- ✅ Navbar navigation
- ✅ Modals (Transaction, Stats)
- ✅ Theme toggle
- ✅ Protected routes

### **Por Implementar:**
- ⚠️ Profile page
- ⚠️ Settings page
- ⚠️ Connect Wallet functionality
- ⚠️ Mobile hamburger menu
- ⚠️ Keyboard shortcuts
- ⚠️ Search functionality
- ⚠️ Notifications

---

## 🎨 Consistencia de Navegación

### **Botones de Retorno:**
```javascript
Todas las páginas de checkout tienen:
✅ <ArrowLeft /> Back to Checkout
✅ Hover effect
✅ Transition smooth
```

### **Botones Primarios:**
```javascript
✅ Color: Blue (#3B82F6)
✅ Hover: Blue-600
✅ Active: scale-95
✅ Icons: Lucide React
```

### **Botones Secundarios:**
```javascript
✅ Color: White/10 (dark) | Gray-100 (light)
✅ Hover: White/15 (dark) | Gray-200 (light)
✅ Active: scale-95
```

---

**Status**: ✅ Navegación Completa Implementada
**Última Actualización**: Nov 14, 2025
