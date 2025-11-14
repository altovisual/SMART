# Configuración de Modo Desarrollo

## ✅ Cambio Aplicado: Login Sin Verificación de Email

### Ubicación del Cambio

**Archivo**: `src/services/authService.jsx`  
**Línea**: 29

```javascript
const SKIP_EMAIL_VERIFICATION = true; // Set to false in production
```

### ¿Qué Hace Este Cambio?

Permite hacer login **sin necesidad de verificar el email** en Supabase. Esto es útil para:
- ✅ Testing rápido
- ✅ Desarrollo local
- ✅ Cuentas de prueba sin acceso al email

### Estado Actual

```javascript
SKIP_EMAIL_VERIFICATION = true  // ✅ Activo - Login sin verificación
```

### Cómo Usar

1. **Intenta hacer login** con las credenciales:
   ```
   Email: testmail@gmail.com
   Password: testpassword@@
   ```

2. **Verás un warning en la consola**:
   ```
   ⚠️ DEV MODE: Logging in without email verification
   ```

3. **El login funcionará** aunque el email no esté verificado

### Verificar el Rol

Asegúrate de usar la página correcta según el rol de la cuenta:

- **Si el rol es "user"**: 
  - URL: `http://localhost:3000/`
  
- **Si el rol es "merchant"**: 
  - URL: `http://localhost:3000/merchant`

### Verificar el Rol de la Cuenta

Ejecuta este comando para ver el rol:

```bash
node scripts/checkAccount.js
```

Busca en el output:
```
Role (metadata): user    # o "merchant"
```

## ⚠️ Importante para Producción

### Antes de Deployar a Producción

**DEBES cambiar el flag a `false`**:

```javascript
const SKIP_EMAIL_VERIFICATION = false; // Producción
```

### Por Qué Es Importante

- 🔒 **Seguridad**: La verificación de email previene cuentas falsas
- ✉️ **Validación**: Confirma que el usuario tiene acceso al email
- 🛡️ **Protección**: Reduce spam y cuentas bot

## 🔄 Alternativas

### Opción 1: Usar Variable de Entorno (Recomendado)

Modifica el código para usar una variable de entorno:

```javascript
const SKIP_EMAIL_VERIFICATION = process.env.REACT_APP_SKIP_EMAIL_VERIFICATION === 'true';
```

Luego en `.env`:
```env
# Development
REACT_APP_SKIP_EMAIL_VERIFICATION=true

# Production
REACT_APP_SKIP_EMAIL_VERIFICATION=false
```

### Opción 2: Desactivar en Supabase

1. Ve a Supabase Dashboard
2. Settings → Authentication
3. Busca "Enable email confirmations"
4. Desactívalo (solo para desarrollo)

**Nota**: Esto afecta a TODOS los usuarios del proyecto.

## 🧪 Testing

### Probar con Email Verificado

1. Cambia el flag a `false`
2. Verifica el email en Supabase Dashboard
3. Intenta hacer login
4. Debe funcionar normalmente

### Probar con Email No Verificado

1. Cambia el flag a `true`
2. Intenta hacer login sin verificar
3. Debe funcionar con warning en consola

## 📋 Checklist de Deployment

Antes de hacer deploy a producción:

- [ ] Cambiar `SKIP_EMAIL_VERIFICATION` a `false`
- [ ] O usar variable de entorno
- [ ] Probar que la verificación de email funciona
- [ ] Verificar que emails de confirmación se envían
- [ ] Documentar el proceso de verificación para usuarios

## 🔍 Debugging

### Si el Login Aún Falla

1. **Verifica el rol**:
   ```bash
   node scripts/checkAccount.js
   ```

2. **Revisa la consola del navegador** (F12):
   - Busca el warning de DEV MODE
   - Busca errores de rol incorrecto

3. **Verifica que el cambio se aplicó**:
   - Abre `src/services/authService.jsx`
   - Busca la línea 29
   - Confirma que `SKIP_EMAIL_VERIFICATION = true`

4. **Refresca la aplicación**:
   - Ctrl + R en el navegador
   - O reinicia el servidor: `npm start`

## 📝 Notas Adicionales

### Comportamiento Esperado

**Con `SKIP_EMAIL_VERIFICATION = true`**:
- ✅ Login funciona sin verificación
- ⚠️ Warning en consola
- ✅ Usuario puede acceder a la app

**Con `SKIP_EMAIL_VERIFICATION = false`**:
- ❌ Login falla si email no verificado
- 🔔 Alert al usuario
- ❌ Usuario no puede acceder

### Logs en Consola

```javascript
// Email verificado
// (sin mensajes especiales)

// Email NO verificado con SKIP = true
⚠️ DEV MODE: Logging in without email verification

// Email NO verificado con SKIP = false
Email not confirmed. Please verify your email.
```

---

**Última actualización**: Noviembre 2025  
**Estado**: ✅ Modo desarrollo activo
