# 🍎 SmartPay - Apple Pay / iOS Design System

## ✅ Implementación Completa

### 🎨 **Nuevo Diseño Apple/iOS**

La aplicación ahora tiene un diseño profesional inspirado en Apple Pay y iOS con:

- ✅ **Modo Claro y Oscuro** (Light/Dark mode)
- ✅ **Tipografía SF Pro** (sistema Apple)
- ✅ **Colores iOS oficiales**
- ✅ **Animaciones suaves tipo iOS**
- ✅ **Componentes estilo Apple**
- ✅ **Scrollbars personalizados**

---

## 🌓 Modo Claro/Oscuro

### Toggle de Tema

Botón en el header que cambia entre modos:
- 🌞 **Light Mode**: Fondo #F5F5F7 (gris claro iOS)
- 🌙 **Dark Mode**: Fondo #000000 (negro puro iOS)

### Persistencia

- Se guarda en `localStorage`
- Detecta preferencia del sistema
- Transiciones suaves (300ms)

### Uso:

```javascript
import { useTheme } from '../../contexts/ThemeContext';

const { isDark, toggleTheme, theme } = useTheme();
```

---

## 🎨 Paleta de Colores iOS

### Light Mode

```css
Backgrounds:
- Primary: #FFFFFF (blanco)
- Secondary: #F5F5F7 (gris claro)
- Tertiary: #E8E8ED (gris medio)

Text:
- Primary: #000000 (negro)
- Secondary: #3C3C43 (gris oscuro)
- Tertiary: #8E8E93 (gris)

System Colors:
- Blue: #007AFF
- Green: #34C759
- Red: #FF3B30
- Orange: #FF9500
- Purple: #AF52DE
```

### Dark Mode

```css
Backgrounds:
- Primary: #000000 (negro)
- Secondary: #1C1C1E (gris muy oscuro)
- Tertiary: #2C2C2E (gris oscuro)

Text:
- Primary: #FFFFFF (blanco)
- Secondary: #EBEBF5 (gris claro)
- Tertiary: #EBEBF5 (gris claro)

System Colors:
- Blue: #0A84FF
- Green: #30D158
- Red: #FF453A
- Orange: #FF9F0A
- Purple: #BF5AF2
```

---

## 📐 Tipografía iOS

```css
Font Family: SF Pro Display / SF Pro Text
(Fallback: -apple-system, BlinkMacSystemFont)

Sizes:
- Large Title: 34px
- Title 1: 28px
- Title 2: 22px
- Title 3: 20px
- Headline: 17px
- Body: 17px
- Callout: 16px
- Subheadline: 15px
- Footnote: 13px
- Caption: 12px

Weights:
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
```

---

## 🔲 Border Radius iOS

```css
Small: 6px
Medium: 10px
Large: 12px
XL: 16px
2XL: 20px
3XL: 24px
Full: 9999px (círculo perfecto)
```

---

## ✨ Componentes iOS

### 1. Cards

```jsx
<div className={`
  ${isDark ? 'bg-[#1C1C1E]' : 'bg-white'}
  rounded-2xl p-6
  border ${isDark ? 'border-white/10' : 'border-black/5'}
  hover:scale-[1.02] active:scale-[0.98]
  transition-all duration-200
  shadow-sm
`}>
  Content
</div>
```

**Características**:
- Fondo adaptativo (light/dark)
- Bordes sutiles
- Hover scale (1.02)
- Active scale (0.98)
- Sombra suave

### 2. Buttons

#### Primary Button
```jsx
<button className={`
  ${isDark ? 'bg-blue-600' : 'bg-blue-500'}
  text-white px-6 py-2.5 rounded-xl font-semibold
  active:scale-95 transition-all duration-150
  shadow-sm
`}>
  Button Text
</button>
```

#### Secondary Button
```jsx
<button className={`
  ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-50 hover:bg-gray-100'}
  ${isDark ? 'text-white' : 'text-black'}
  px-6 py-2.5 rounded-xl font-semibold
  active:scale-[0.98] transition-all duration-150
`}>
  Button Text
</button>
```

### 3. List Items

```jsx
<div className={`
  p-4 flex items-center justify-between
  ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}
  active:bg-gray-100 dark:active:bg-white/10
  transition-colors duration-150 cursor-pointer
`}>
  <div>Item content</div>
  <ChevronRight />
</div>
```

### 4. Inputs

```jsx
<input className={`
  ${isDark ? 'bg-white/5' : 'bg-gray-100'}
  ${isDark ? 'text-white' : 'text-black'}
  border ${isDark ? 'border-white/10' : 'border-black/5'}
  rounded-xl px-4 py-3
  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
  transition-all duration-200
`} />
```

### 5. Badges

```jsx
<span className={`
  ${isDark ? 'bg-white/10' : 'bg-gray-100'}
  ${isDark ? 'text-white' : 'text-black'}
  px-3 py-1 rounded-full text-sm font-medium
`}>
  Badge
</span>
```

---

## 🎭 Animaciones iOS

### Slide Up (entrada de elementos)

```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
```

### Hover/Active States

```css
/* Hover: escala ligeramente */
hover:scale-[1.02]

/* Active: escala hacia abajo */
active:scale-[0.98]

/* Transición suave */
transition-all duration-200
```

---

## 📱 Nuevo Dashboard iOS

### Características:

1. **Header**
   - Título grande (iOS style)
   - Toggle de tema
   - Botón primary action

2. **Stats Cards (4)**
   - Total Spent
   - Rewards
   - Transactions
   - Success Rate
   - Con iconos y cambios porcentuales

3. **Spending Overview**
   - Gráfico de barras simple
   - Botones de período (7D, 30D, 90D)
   - Stats: Average, Highest, Lowest

4. **Quick Actions**
   - Lista de acciones rápidas
   - Con iconos y chevron
   - Hover effects

5. **Recent Transactions**
   - Lista de transacciones
   - Status icons (✓, ✗, ⏰)
   - Clickeable items

---

## 🎯 Archivos Creados/Modificados

### Nuevos Archivos:

1. **`src/styles/appleDesignSystem.js`**
   - Sistema de diseño completo
   - Colores, tipografía, spacing
   - Funciones helper

2. **`src/contexts/ThemeContext.jsx`**
   - Context para tema global
   - Hook `useTheme()`
   - Persistencia en localStorage

3. **`src/components/common/ThemeToggle.jsx`**
   - Botón toggle animado
   - Iconos Sun/Moon
   - Transiciones suaves

4. **`src/pages/Dashboard/AppleUserDashboard.jsx`**
   - Dashboard completo iOS style
   - Responsive
   - Modo claro/oscuro

### Archivos Modificados:

1. **`src/App.js`**
   - Agregado `ThemeProvider`

2. **`src/index.css`**
   - Estilos base iOS
   - Scrollbars personalizados
   - Animaciones

3. **`src/router/AppRouter.jsx`**
   - Usa `AppleUserDashboard`

---

## 🚀 Cómo Usar

### 1. Refresca la Aplicación

```bash
Ctrl + Shift + R
```

### 2. Login

```
Email: user@test.com
Password: password
```

### 3. Ver Dashboard iOS

Deberías ver:
- ✅ Diseño limpio estilo Apple
- ✅ Botón de tema en header
- ✅ Cards con glassmorphism
- ✅ Animaciones suaves
- ✅ Colores iOS oficiales

### 4. Cambiar Tema

Click en el botón 🌙/🌞 en el header.

---

## 🎨 Comparación: Antes vs Después

### Antes:
- ❌ Un solo tema (oscuro)
- ❌ Colores inconsistentes
- ❌ Bordes variados
- ❌ Sin animaciones
- ❌ Diseño genérico

### Después:
- ✅ Modo claro y oscuro
- ✅ Colores iOS oficiales
- ✅ Border radius consistente (iOS)
- ✅ Animaciones suaves
- ✅ Diseño profesional Apple Pay

---

## 📊 Características iOS Implementadas

| Característica | Estado |
|----------------|--------|
| Light/Dark Mode | ✅ |
| SF Pro Font | ✅ |
| iOS Colors | ✅ |
| Border Radius iOS | ✅ |
| Hover Effects | ✅ |
| Active States | ✅ |
| Smooth Animations | ✅ |
| Scrollbars iOS | ✅ |
| Cards Style | ✅ |
| Buttons iOS | ✅ |
| List Items | ✅ |
| Badges | ✅ |

---

## 🔧 Próximos Pasos

### Para Completar el Diseño iOS:

1. **Actualizar Auth Pages**
   - Login/Signup con estilo iOS
   - Inputs rounded-xl
   - Buttons iOS style

2. **Actualizar Merchant Dashboard**
   - Mismo estilo que User Dashboard
   - Modo claro/oscuro

3. **Actualizar Checkout**
   - Cards iOS style
   - Payment methods con iconos
   - Smooth transitions

4. **Actualizar Navbar**
   - Glassmorphism
   - Modo claro/oscuro
   - Search bar iOS style

5. **Agregar Modals iOS**
   - Bottom sheets
   - Blur backdrop
   - Slide animations

---

## 💡 Tips de Diseño iOS

### 1. Espaciado
- Usa múltiplos de 4px
- Padding generoso (16-24px)
- Margin entre secciones (24-32px)

### 2. Colores
- Usa colores del sistema iOS
- Evita colores muy saturados
- Mantén contraste accesible

### 3. Tipografía
- Títulos grandes y bold
- Texto secundario más claro
- Jerarquía clara

### 4. Interacciones
- Feedback visual inmediato
- Animaciones < 300ms
- Active states obvios

### 5. Consistencia
- Mismo border radius en toda la app
- Mismos colores para acciones similares
- Mismas animaciones

---

## ✅ Resultado Final

Un dashboard moderno, profesional y elegante que:
- 🍎 Se ve como una app nativa de iOS
- 🌓 Soporta modo claro y oscuro
- ✨ Tiene animaciones suaves y naturales
- 📱 Es responsive y mobile-friendly
- 🎨 Usa colores y tipografía oficial de Apple
- 🚀 Carga rápido y es performante

---

**Status**: 🟢 Dashboard iOS Implementado  
**Modo**: Light/Dark disponible  
**Próximo**: Actualizar resto de componentes con estilo iOS
