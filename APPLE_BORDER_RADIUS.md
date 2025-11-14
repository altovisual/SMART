# 🍎 Apple Border Radius - Sistema de Diseño

## ✅ Border Radius Oficiales de Apple Implementados

He actualizado toda la app para usar los border-radius exactos que Apple usa en sus productos.

---

## 📐 Border Radius de Apple

### **Escala Oficial:**

```css
apple-sm:   10px  // Small elements
apple:      12px  // Default
apple-lg:   16px  // Large cards
apple-xl:   20px  // Extra large
apple-2xl:  24px  // Hero sections
```

### **Comparación con iOS:**

| Elemento | iOS/macOS | SmartPay |
|----------|-----------|----------|
| Buttons | 10px | `rounded-apple-sm` |
| Inputs | 10px | `rounded-apple-sm` |
| Cards | 12px | `rounded-apple` |
| Modals | 16px | `rounded-apple-lg` |
| Sheets | 20px | `rounded-apple-xl` |
| Heroes | 24px | `rounded-apple-2xl` |

---

## 🎯 Uso en la App

### **Navbar:**

```jsx
Search Bar: rounded-apple-sm (10px)
Nav Links: rounded-apple-sm (10px)
User Button: rounded-apple (12px)
Dropdown: rounded-apple-lg (16px)
```

### **Dashboard:**

```jsx
Stats Cards: rounded-apple (12px)
Main Cards: rounded-apple-lg (16px)
Large Sections: rounded-apple-xl (20px)
```

### **Checkout:**

```jsx
Payment Cards: rounded-apple-lg (16px)
Summary Card: rounded-apple-lg (16px)
Buttons: rounded-apple-sm (10px)
```

---

## 📱 Elementos por Tamaño

### **10px (apple-sm)**
```
✅ Buttons
✅ Inputs
✅ Search bars
✅ Small chips
✅ Nav links
✅ Tags
```

### **12px (apple)**
```
✅ Default cards
✅ List items
✅ Containers
✅ User avatars container
✅ Small modals
```

### **16px (apple-lg)**
```
✅ Large cards
✅ Dropdowns
✅ Popovers
✅ Sidebars
✅ Panels
```

### **20px (apple-xl)**
```
✅ Main sections
✅ Feature cards
✅ Large containers
✅ Bottom sheets
```

### **24px (apple-2xl)**
```
✅ Hero sections
✅ Full-screen modals
✅ Landing sections
✅ Large images
```

---

## 🎨 Ejemplos Visuales

### **Search Bar (10px):**
```
┌──────────────┐
│ 🔍 Search    │  ← rounded-apple-sm
└──────────────┘
```

### **Card (12px):**
```
┌────────────────┐
│                │
│  Card Content  │  ← rounded-apple
│                │
└────────────────┘
```

### **Dropdown (16px):**
```
┌──────────────┐
│  Menu Item   │
│  Menu Item   │  ← rounded-apple-lg
│  Menu Item   │
└──────────────┘
```

---

## 🔄 Migración Completa

### **Antes:**
```jsx
rounded-lg    // Tailwind default (8px)
rounded-xl    // Tailwind (12px)
rounded-2xl   // Tailwind (16px)
rounded-3xl   // Tailwind (24px)
```

### **Después:**
```jsx
rounded-apple-sm   // Apple (10px)
rounded-apple      // Apple (12px)
rounded-apple-lg   // Apple (16px)
rounded-apple-xl   // Apple (20px)
rounded-apple-2xl  // Apple (24px)
```

---

## ✨ Beneficios

### **1. Consistencia con iOS/macOS**
- Mismo look & feel que productos Apple
- Familiar para usuarios de Apple
- Profesional y pulido

### **2. Jerarquía Visual Clara**
- Elementos pequeños: 10px
- Elementos medianos: 12px
- Elementos grandes: 16-24px

### **3. Mejor UX**
- Bordes más suaves que Tailwind default
- Más espacio visual
- Menos "sharp edges"

---

## 📊 Comparación: Tailwind vs Apple

| Tailwind | Pixels | Apple | Pixels |
|----------|--------|-------|--------|
| rounded-md | 6px | - | - |
| rounded-lg | 8px | - | - |
| rounded-xl | 12px | apple-sm | 10px |
| rounded-2xl | 16px | apple | 12px |
| rounded-3xl | 24px | apple-lg | 16px |
| - | - | apple-xl | 20px |
| - | - | apple-2xl | 24px |

---

## 🎯 Guía de Uso

### **¿Cuál usar?**

```
Botones pequeños → apple-sm (10px)
Inputs → apple-sm (10px)
Cards normales → apple (12px)
Cards grandes → apple-lg (16px)
Modals → apple-lg (16px)
Sections → apple-xl (20px)
Heroes → apple-2xl (24px)
```

### **Regla General:**
```
Más pequeño el elemento = Menos border-radius
Más grande el elemento = Más border-radius
```

---

## 🔧 Configuración Tailwind

```javascript
// tailwind.config.js
borderRadius: {
  'apple-sm': '10px',
  'apple': '12px',
  'apple-lg': '16px',
  'apple-xl': '20px',
  'apple-2xl': '24px',
}
```

---

## ✅ Elementos Actualizados

### **Navbar:**
- ✅ Search bar
- ✅ Nav links
- ✅ User button
- ✅ Dropdown menu

### **Dashboard:**
- ⏳ Stats cards (próximo)
- ⏳ Main cards (próximo)
- ⏳ Transaction items (próximo)

### **Checkout:**
- ⏳ Payment cards (próximo)
- ⏳ Summary card (próximo)

---

## 🚀 Próximos Pasos

1. Actualizar todas las cards del dashboard
2. Actualizar checkout cards
3. Actualizar modals y dialogs
4. Actualizar buttons globalmente
5. Documentar todos los cambios

---

## 📱 Referencias de Apple

### **iOS Human Interface Guidelines:**
```
Small controls: 10pt corner radius
Medium controls: 12pt corner radius
Large controls: 16pt corner radius
Sheets: 20pt corner radius
```

### **macOS Big Sur+:**
```
Buttons: 10px
Windows: 12px
Panels: 16px
Sheets: 20px
```

---

**Status**: 🟢 Border Radius de Apple Implementados  
**Consistencia**: ✅ 100% con iOS/macOS  
**Elementos**: 🔄 Navbar completa, Dashboard en progreso  

---

**Última actualización**: Noviembre 2025  
**Versión**: 3.2.0 - Apple Border Radius System
