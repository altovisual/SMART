# 🏗️ SmartPay - Arquitectura y Contexto de la Aplicación

## 📋 Resumen Ejecutivo

**SmartPay** es una aplicación de pagos que permite:
- Usuarios (customers) realizar pagos con crypto o fiat
- Comerciantes (merchants) recibir pagos y ver dashboard
- Integración con wallets crypto (MetaMask)
- Autenticación con Supabase

## 🎯 Concepto Principal

Sistema de pagos dual con dos tipos de usuarios:
1. **Users (Customers)**: Hacen checkout y pagan
2. **Merchants**: Reciben pagos y gestionan transacciones

## 🏛️ Arquitectura General

```
┌─────────────────────────────────────────────────────────┐
│                     SmartPay App                         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │   Frontend   │───▶│   Supabase   │                   │
│  │  React App   │◀───│   Backend    │                   │
│  └──────────────┘    └──────────────┘                   │
│         │                     │                          │
│         │                     │                          │
│         ▼                     ▼                          │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │   MetaMask   │    │  PostgreSQL  │                   │
│  │   Wallet     │    │   Database   │                   │
│  └──────────────┘    └──────────────┘                   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## 📁 Estructura de Carpetas

```
SmartPay/
├── src/
│   ├── App.js                    # Punto de entrada principal
│   ├── index.js                  # Render de React
│   │
│   ├── components/               # Componentes reutilizables
│   │   ├── auth/                # Formularios de login/signup
│   │   ├── checkout/            # Proceso de pago
│   │   ├── common/              # Componentes compartidos
│   │   └── dashboard/           # Widgets del dashboard
│   │
│   ├── pages/                   # Páginas principales
│   │   ├── Auth/                # Páginas de autenticación
│   │   ├── Dashboard/           # Dashboards (User/Merchant)
│   │   ├── Checkout.jsx         # Página de checkout
│   │   └── PaymentSummary.jsx   # Resumen de pago
│   │
│   ├── redux/                   # Estado global
│   │   ├── auth/                # Estado de autenticación
│   │   ├── checkout/            # Estado del checkout
│   │   ├── dashboard/           # Estado del dashboard
│   │   ├── wallet/              # Estado de wallet crypto
│   │   ├── store.jsx            # Configuración de Redux
│   │   └── rootReducer.jsx      # Combinación de reducers
│   │
│   ├── router/                  # Configuración de rutas
│   │   ├── AppRouter.jsx        # Rutas principales
│   │   └── ProtectedRoute.jsx   # Rutas protegidas
│   │
│   ├── services/                # Servicios externos
│   │   ├── authService.jsx      # Autenticación con Supabase
│   │   └── mockAuthService.jsx  # Mock para desarrollo
│   │
│   ├── layouts/                 # Layouts de página
│   │   └── MainLayout.jsx       # Layout principal
│   │
│   ├── hooks/                   # Custom React hooks
│   │   └── useAuthStateListener.jsx
│   │
│   ├── assets/                  # Recursos estáticos
│   ├── styles/                  # Estilos globales
│   └── supabaseClient.jsx       # Cliente de Supabase
│
├── public/                      # Archivos públicos
├── scripts/                     # Scripts de utilidad
│   ├── checkAccount.js          # Verificar cuentas
│   ├── testLogin.js             # Probar login
│   └── createTestAccount.js     # Crear cuentas de prueba
│
└── [Archivos de configuración]
    ├── package.json             # Dependencias
    ├── tailwind.config.js       # Config de Tailwind
    ├── README.md                # Documentación principal
    ├── DEVELOPMENT.md           # Guía de desarrollo
    ├── MOCK_MODE.md             # Modo mock
    └── ARCHITECTURE.md          # Este archivo
```

## 🔄 Flujo de Datos (Redux)

```
┌─────────────────────────────────────────────────────┐
│                   Redux Store                        │
├─────────────────────────────────────────────────────┤
│                                                       │
│  auth: {                                             │
│    user: {...},              ← Usuario actual        │
│    status: 'loading'|'success'|'error'              │
│  }                                                    │
│                                                       │
│  dashboard: {                                        │
│    data: {...},              ← Datos del dashboard   │
│    loading: boolean                                  │
│  }                                                    │
│                                                       │
│  checkout: {                                         │
│    paymentMethod: 'crypto'|'fiat',                  │
│    amount: number,                                   │
│    items: [...]              ← Carrito de compra     │
│  }                                                    │
│                                                       │
│  wallet: {                                           │
│    address: string,          ← Dirección de wallet   │
│    balance: number,                                  │
│    connected: boolean                                │
│  }                                                    │
│                                                       │
└─────────────────────────────────────────────────────┘
```

## 🛣️ Sistema de Rutas

### Rutas Públicas (No requieren login)
```
/                    → UserAuth (Login/Signup de usuario)
/merchant            → MerchantAuth (Login/Signup de merchant)
```

### Rutas de Usuario (Requieren login como user)
```
/dashboard           → UserDashboard
/checkout            → Checkout (proceso de pago)
/payment-fiat        → PaymentSourceSelector (pago fiat)
/payment-crypto      → CryptoPaymentSourceSelector (pago crypto)
/paymentsummary      → PaymentSummary (resumen)
```

### Rutas de Merchant (Requieren login como merchant)
```
/merchant/dashboard  → MerchantDashboard
```

## 🔐 Sistema de Autenticación

### Flujo de Login

```
1. Usuario ingresa credenciales
   ↓
2. authService.loginUser(email, password, role)
   ↓
3. Supabase valida credenciales
   ↓
4. Verifica rol (user vs merchant)
   ↓
5. Verifica email confirmado
   ↓
6. Guarda usuario en Redux + localStorage
   ↓
7. Redirige a dashboard correspondiente
```

### Modo Mock (Desarrollo)

```javascript
// src/services/authService.jsx
const USE_MOCK_AUTH = true; // Bypass Supabase

// Credenciales mock disponibles:
user@test.com / password (user)
merchant@test.com / password (merchant)
testmail@gmail.com / testpassword@@ (merchant)
```

## 🗄️ Base de Datos (Supabase)

### Tablas Principales

**auth.users** (Supabase Auth)
- id
- email
- email_confirmed_at
- user_metadata (role, name)

**users** (Tabla custom)
- id
- auth_id (FK a auth.users)
- email
- name
- role ('user' | 'merchant')
- created_at

**[Otras tablas según funcionalidad]**
- transactions
- payments
- merchant_data

## 🎨 Stack Tecnológico

### Frontend
- **React** 18.2.0 - Framework principal
- **React Router** 6.8.1 - Navegación
- **Redux** + **Redux Thunk** - Estado global
- **Tailwind CSS** 3.2.4 - Estilos
- **Lucide React** - Iconos

### Backend/Database
- **Supabase** - Backend as a Service
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions

### Crypto/Web3
- **ethers.js** 6.15.0 - Interacción con blockchain
- **MetaMask** - Wallet integration

### UI Components
- **Material-UI** 7.3.1 - Componentes
- **Headless UI** 2.2.4 - Componentes accesibles
- **Recharts** 2.15.3 - Gráficos

## 🔑 Conceptos Clave

### 1. Roles de Usuario

```javascript
// Dos tipos de usuarios:
role: 'user'      // Cliente que paga
role: 'merchant'  // Comerciante que recibe pagos
```

### 2. Métodos de Pago

```javascript
paymentMethod: 'fiat'    // Tarjeta, banco
paymentMethod: 'crypto'  // Crypto wallet (MetaMask)
```

### 3. Rutas Protegidas

```javascript
<PublicRoute>     // Solo si NO está logueado
<UserRoute>       // Solo si está logueado como 'user'
<MerchantRoute>   // Solo si está logueado como 'merchant'
```

### 4. Persistencia

```javascript
// Usuario se guarda en:
localStorage.setItem('authUser', JSON.stringify(user))

// Al recargar página:
const savedUser = localStorage.getItem('authUser')
store.dispatch(setUser(JSON.parse(savedUser)))
```

## 🔄 Flujos Principales

### Flujo de Checkout (Usuario)

```
1. User Dashboard
   ↓
2. Selecciona producto/servicio
   ↓
3. /checkout - Revisa orden
   ↓
4. Selecciona método de pago
   ├─▶ Fiat: /payment-fiat
   └─▶ Crypto: /payment-crypto
   ↓
5. Procesa pago
   ↓
6. /paymentsummary - Confirmación
```

### Flujo de Dashboard (Merchant)

```
1. Login como merchant
   ↓
2. /merchant/dashboard
   ↓
3. Ve transacciones
4. Ve estadísticas
5. Gestiona pagos recibidos
```

## 🧩 Componentes Principales

### Autenticación
- `UserAuthForm` - Formulario de login/signup de usuario
- `MerchantAuthForm` - Formulario de login/signup de merchant
- `AuthNavBar` - Navbar para páginas de auth

### Checkout
- `PaymentSourceSelector` - Selector de pago fiat
- `CryptoPaymentSourceSelector` - Selector de pago crypto
- `PaymentSummary` - Resumen de transacción

### Dashboard
- `UserDashboard` - Dashboard de usuario
- `MerchantDashboard` - Dashboard de merchant
- Widgets de estadísticas

### Comunes
- `MainLayout` - Layout principal con navbar
- `LoadingScreen` - Pantalla de carga
- `PageNotFound` - 404

## 🛠️ Modos de Desarrollo

### Modo Normal (Supabase Real)
```javascript
// src/services/authService.jsx
const USE_MOCK_AUTH = false;
const SKIP_EMAIL_VERIFICATION = false;
```

### Modo Mock (Sin Supabase)
```javascript
// src/services/authService.jsx
const USE_MOCK_AUTH = true;
// Usa mockAuthService.jsx
```

### Modo Dev (Supabase sin verificación)
```javascript
// src/services/authService.jsx
const USE_MOCK_AUTH = false;
const SKIP_EMAIL_VERIFICATION = true;
```

## 📊 Estado de la Aplicación

### Estado Actual del Proyecto
- ✅ Autenticación funcional
- ✅ Rutas protegidas implementadas
- ✅ UI completa con Tailwind
- ✅ Integración con Supabase
- ✅ Modo mock para desarrollo
- ⚠️ Verificación de email requerida (o usar mock)
- 🔄 Dashboard con datos reales (requiere Supabase)

## 🚀 Comandos Importantes

```bash
# Desarrollo
npm start                        # Iniciar app
npm test                         # Tests
npm run build                    # Build producción

# Scripts de utilidad
node scripts/checkAccount.js     # Verificar cuenta
node scripts/testLogin.js        # Probar login
node scripts/createTestAccount.js # Crear cuenta
node scripts/listUsers.js        # Listar usuarios
```

## 📝 Variables de Entorno

```env
# .env (actualmente hardcoded en supabaseClient.jsx)
REACT_APP_SUPABASE_URL=https://ycsqkkupncgzwihmamtu.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGci...
```

## 🔍 Debugging

### Ver estado de Redux
```javascript
// En consola del navegador:
window.__REDUX_DEVTOOLS_EXTENSION__
// O instalar Redux DevTools extension
```

### Ver usuario actual
```javascript
// En consola:
localStorage.getItem('authUser')
```

### Ver logs de autenticación
```javascript
// Busca en consola:
"MOCK MODE ACTIVE" // Si está en modo mock
"DEV MODE" // Si skip email verification
"Login error:" // Si hay error
```

## 📚 Documentación Adicional

- `README.md` - Introducción y quick start
- `DEVELOPMENT.md` - Guía de desarrollo completa
- `MOCK_MODE.md` - Uso del modo mock
- `DEV_MODE_CONFIG.md` - Configuración de desarrollo
- `LOGIN_TROUBLESHOOTING.md` - Solución de problemas de login
- `TEST_ACCOUNTS.md` - Gestión de cuentas de prueba

## 🎯 Próximos Pasos Recomendados

1. **Familiarízate con el flujo**:
   - Login → Dashboard → Checkout → Payment

2. **Explora los componentes**:
   - `src/components/` - UI components
   - `src/pages/` - Páginas principales

3. **Entiende Redux**:
   - `src/redux/` - Estado global
   - Usa Redux DevTools

4. **Prueba el mock mode**:
   - Activa `USE_MOCK_AUTH = true`
   - Login sin Supabase

5. **Revisa las rutas**:
   - `src/router/AppRouter.jsx`
   - Rutas públicas vs protegidas

---

**Última actualización**: Noviembre 2025  
**Versión**: 0.1.5  
**Autor**: SmartDev Team
