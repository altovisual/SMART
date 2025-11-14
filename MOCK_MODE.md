# 🎭 Modo Mock - Desarrollo Sin Supabase

## ✅ ¡ACTIVADO! Ahora puedes entrar sin Supabase

He configurado un **modo mock** que simula la autenticación sin necesidad de Supabase.

## 🔑 Credenciales de Prueba Mock

Puedes usar cualquiera de estas cuentas:

### Usuario Regular (Customer)
```
Email: user@test.com
Password: password
Página: http://localhost:3000/
```

### Comerciante (Merchant)
```
Email: merchant@test.com
Password: password
Página: http://localhost:3000/merchant
```

### Cuenta Original (Merchant)
```
Email: testmail@gmail.com
Password: testpassword@@
Página: http://localhost:3000/merchant
```

## 🚀 Cómo Usar

### 1. Refresca la Aplicación

La aplicación debe estar corriendo. Si no:

```bash
npm start
```

### 2. Haz Hard Refresh en el Navegador

- **Ctrl + Shift + R** (Windows)
- O **Ctrl + F5**

### 3. Intenta Hacer Login

Usa cualquiera de las credenciales de arriba.

### 4. Verifica en la Consola

Deberías ver:
```
⚠️ MOCK MODE ACTIVE: Using mock authentication (no Supabase)
🎭 MOCK MODE: Using mock authentication
✅ MOCK LOGIN SUCCESS: [email]
```

## ⚙️ Configuración

### Activar/Desactivar Mock Mode

**Archivo 1**: `src/services/authService.jsx` (Línea 5)

```javascript
const USE_MOCK_AUTH = true;  // Mock activo (sin Supabase)
const USE_MOCK_AUTH = false; // Supabase real
```

**Archivo 2**: `src/redux/dashboard/dashboardActions.jsx` (Línea 9)

```javascript
const USE_MOCK_DATA = true;  // Mock dashboard data
const USE_MOCK_DATA = false; // Real Supabase data
```

⚠️ **Importante**: Ambos deben estar en `true` para modo mock completo

### Agregar Más Usuarios Mock

**Archivo**: `src/services/mockAuthService.jsx`

Agrega usuarios en el objeto `MOCK_USERS`:

```javascript
const MOCK_USERS = {
  'nuevo@test.com': {
    id: 'mock-nuevo-id',
    email: 'nuevo@test.com',
    user_metadata: {
      name: 'Nuevo Usuario',
      role: 'user', // o 'merchant'
    },
    email_confirmed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
};

const MOCK_PASSWORDS = {
  'nuevo@test.com': 'mipassword',
};
```

## 🎯 Características del Mock

### ✅ Lo que Funciona:
- Login con credenciales mock
- Signup (crea usuarios en memoria)
- Validación de rol (user vs merchant)
- Navegación entre páginas
- UI completa de la aplicación

### ❌ Lo que NO Funciona:
- Datos reales de Supabase
- Persistencia (se pierde al refrescar)
- Operaciones de base de datos
- Datos del dashboard (necesitarás mock adicional)

## 🔧 Troubleshooting

### "Login sigue fallando"

1. **Verifica que el cambio se aplicó**:
   - Abre `src/services/authService.jsx`
   - Línea 5 debe decir: `const USE_MOCK_AUTH = true;`

2. **Refresca la página**:
   - Ctrl + Shift + R

3. **Revisa la consola del navegador**:
   - F12 → Console
   - Busca: "MOCK MODE ACTIVE"

### "No veo datos en el dashboard"

El mock solo simula autenticación. Para datos del dashboard necesitas:

**Opción A**: Mock adicional de datos (puedo crearlo)  
**Opción B**: Usar Supabase real (desactiva mock)

### "Quiero volver a Supabase real"

Cambia en `src/services/authService.jsx`:
```javascript
const USE_MOCK_AUTH = false;
```

## 📊 Comparación

| Característica | Mock Mode | Supabase Real |
|---------------|-----------|---------------|
| Login | ✅ Instantáneo | ⏰ Requiere verificación |
| Datos | ❌ Simulados | ✅ Reales |
| Persistencia | ❌ No | ✅ Sí |
| Setup | ✅ Cero config | ⚠️ Requiere acceso |
| Testing UI | ✅ Perfecto | ⏰ Lento |
| Testing funcional | ❌ Limitado | ✅ Completo |

## 🎓 Cuándo Usar Cada Modo

### Usa Mock Mode Para:
- ✅ Probar UI y navegación
- ✅ Desarrollo rápido de frontend
- ✅ Demos sin configuración
- ✅ Testing de componentes visuales

### Usa Supabase Real Para:
- ✅ Testing de funcionalidad completa
- ✅ Pruebas de integración
- ✅ Validar flujos de datos
- ✅ Testing de producción

## 🚀 Próximos Pasos

### 1. Probar el Login Mock

```bash
# 1. Asegúrate que la app está corriendo
npm start

# 2. Ve al navegador
http://localhost:3000/merchant

# 3. Login con:
Email: merchant@test.com
Password: password
```

### 2. Si Necesitas Datos Mock del Dashboard

Puedo crear un mock de datos para el dashboard. ¿Quieres que lo haga?

### 3. Cuando Tengas Acceso a Supabase

Simplemente cambia `USE_MOCK_AUTH = false` y todo volverá a funcionar con Supabase real.

## 📝 Notas Importantes

⚠️ **NUNCA uses mock mode en producción**  
⚠️ **Los datos mock no persisten** (se pierden al refrescar)  
⚠️ **Esto es solo para desarrollo local**

## ✅ Checklist

- [ ] Mock mode activado (`USE_MOCK_AUTH = true`)
- [ ] Aplicación corriendo (`npm start`)
- [ ] Página refrescada (Ctrl + Shift + R)
- [ ] Intentar login con credenciales mock
- [ ] Ver mensaje "MOCK MODE ACTIVE" en consola
- [ ] Login exitoso ✅

---

**Estado Actual**: 🎭 **MOCK MODE ACTIVADO**  
**Última actualización**: Noviembre 2025
