# 🎨 EvilCharts + Windsurf Dark Mode

## ✅ Cambios Aplicados

### 🌑 **Modo Oscuro Estilo Windsurf**

**Paleta de Colores:**
```css
Background: #1e1e1e (gris oscuro principal)
Cards: #252526 (gris oscuro secundario)
Borders: #3e3e42 (gris medio)
Text: #d4d4d4 (gris claro)
Accent: #00FFD1 (cyan brillante)
```

**Archivos Actualizados:**
- ✅ `index.css` - Background global
- ✅ `MainLayout.jsx` - Fondo de la app
- ✅ `AppleNavBar.jsx` - Navbar
- ✅ `ModernAuth.jsx` - Login

---

## 📊 **EvilCharts Setup**

### 1. **Instalación:**
```bash
npm install evilcharts
```

### 2. **Importación:**
```javascript
import { EvilChart } from 'evilcharts';
```

### 3. **Uso Básico:**
```javascript
<EvilChart
  type="donut"
  data={salesData}
  options={{
    theme: isDark ? 'dark' : 'light',
    colors: ['#F97316', '#3B82F6', '#10B981'],
    animation: true,
    responsive: true
  }}
/>
```

---

## 🎯 **Tipos de Gráficos Disponibles**

### **1. Donut Chart**
```javascript
<EvilChart
  type="donut"
  data={[
    { name: 'Crypto', value: 45 },
    { name: 'Credit Card', value: 35 },
    { name: 'Bank Transfer', value: 20 }
  ]}
  options={{
    innerRadius: 0.6,
    showLabels: true,
    showLegend: true
  }}
/>
```

### **2. Line Chart**
```javascript
<EvilChart
  type="line"
  data={timeSeriesData}
  options={{
    smooth: true,
    showGrid: true,
    showPoints: true
  }}
/>
```

### **3. Bar Chart**
```javascript
<EvilChart
  type="bar"
  data={monthlyData}
  options={{
    horizontal: false,
    stacked: false,
    showValues: true
  }}
/>
```

### **4. Area Chart**
```javascript
<EvilChart
  type="area"
  data={trendData}
  options={{
    gradient: true,
    smooth: true,
    fill: 0.3
  }}
/>
```

---

## 🎨 **Windsurf Color Palette**

```javascript
const windsurfColors = {
  dark: {
    bg: '#1e1e1e',
    card: '#252526',
    border: '#3e3e42',
    text: '#d4d4d4',
    textMuted: '#858585',
    accent: '#00FFD1',
    blue: '#569CD6',
    green: '#4EC9B0',
    orange: '#CE9178',
    red: '#F48771'
  },
  light: {
    bg: '#F5F5F7',
    card: '#FFFFFF',
    border: '#E5E5E5',
    text: '#000000',
    textMuted: '#6B7280',
    accent: '#0EA5E9'
  }
};
```

---

## 📦 **Próximos Pasos**

1. **Instala EvilCharts:**
   ```bash
   npm install evilcharts
   ```

2. **Actualiza el Merchant Dashboard** con EvilCharts

3. **Verifica el modo oscuro** con los nuevos colores Windsurf

---

**Status**: 🟡 Colores Windsurf Aplicados - EvilCharts Pendiente de Instalación
