# Login Troubleshooting Guide

## Error: "Incorrect email or password"

Este error puede tener varias causas. Aquí están las soluciones paso a paso:

### 🔍 Diagnóstico Rápido

Abre la consola del navegador (F12 → Console) y busca mensajes de error específicos que te darán más información.

### Causas Comunes y Soluciones

#### 1. ❌ Email no verificado

**Síntoma**: El login falla incluso con credenciales correctas.

**Causa**: Supabase requiere que los usuarios verifiquen su email antes de poder hacer login.

**Solución**:
1. Revisa la bandeja de entrada del email usado para registrarse
2. Busca un email de Supabase con el asunto "Confirm your signup"
3. Haz clic en el link de verificación
4. Intenta hacer login nuevamente

**Alternativa (Admin)**:
1. Ve al Dashboard de Supabase
2. Authentication → Users
3. Encuentra el usuario
4. Haz clic en los tres puntos → "Confirm email"

#### 2. ❌ Credenciales incorrectas

**Síntoma**: Error "Invalid login credentials" en la consola.

**Causa**: Email o contraseña incorrectos.

**Solución**:
- Verifica que el email esté escrito correctamente
- Verifica que la contraseña sea la correcta
- Intenta hacer "Forgot Password" si no recuerdas la contraseña

#### 3. ❌ Rol incorrecto

**Síntoma**: Login exitoso pero luego se cierra sesión automáticamente.

**Causa**: Estás intentando entrar como "user" pero la cuenta es de "merchant" (o viceversa).

**Solución**:
- Si estás en `/` (página de usuario), ve a `/merchant`
- Si estás en `/merchant`, ve a `/` (página de usuario)
- O crea una cuenta con el rol correcto

#### 4. ❌ Cuenta no existe en la tabla `users`

**Síntoma**: Login funciona en Supabase Auth pero falla en la app.

**Causa**: La cuenta existe en `auth.users` pero no en la tabla `users`.

**Solución (Admin)**:
```sql
-- Ejecuta esto en Supabase SQL Editor
INSERT INTO users (auth_id, name, email, role, password)
VALUES (
  'auth_user_id_here',
  'User Name',
  'user@example.com',
  'user',
  'encrypted_password'
);
```

#### 5. ❌ Supabase está caído o hay problemas de red

**Síntoma**: Error de conexión en la consola.

**Solución**:
- Verifica tu conexión a internet
- Verifica el status de Supabase: https://status.supabase.com/
- Espera unos minutos y vuelve a intentar

### 🛠️ Herramientas de Diagnóstico

#### Verificar en la Consola del Navegador

Abre DevTools (F12) y busca estos mensajes:

```javascript
// Login exitoso
"User created successfully."

// Email no verificado
"Email not confirmed. Please verify your email."

// Credenciales incorrectas
"Invalid login credentials"

// Rol incorrecto
"Role does not match. Please try again."
```

#### Verificar en Supabase Dashboard

1. Ve a: https://app.supabase.com/project/ycsqkkupncgzwihmamtu
2. Authentication → Users
3. Busca el email que estás intentando usar
4. Verifica:
   - ✅ Email confirmado (columna `email_confirmed_at` tiene fecha)
   - ✅ Usuario existe
   - ✅ Metadata tiene el rol correcto

#### Verificar en la Tabla `users`

1. Ve a: Supabase Dashboard → Table Editor → `users`
2. Busca el email
3. Verifica que el `auth_id` coincida con el ID en Authentication → Users

### 📋 Checklist de Verificación

Antes de intentar hacer login, verifica:

- [ ] El email está escrito correctamente (sin espacios extra)
- [ ] La contraseña es correcta
- [ ] El email ha sido verificado (revisa tu bandeja de entrada)
- [ ] Estás en la página correcta (user vs merchant)
- [ ] La cuenta existe en Supabase
- [ ] No hay problemas de red o con Supabase

### 🔧 Solución Rápida: Crear Nueva Cuenta

Si nada funciona y necesitas testear rápidamente:

1. **Espera 10-15 minutos** (por el rate limit)
2. Usa un email diferente (prueba con Gmail + trick):
   - `tuemail+test1@gmail.com`
   - `tuemail+test2@gmail.com`
3. Crea la cuenta
4. **IMPORTANTE**: Verifica el email inmediatamente
5. Intenta hacer login

### 📞 Obtener Ayuda

Si el problema persiste:

1. Abre la consola del navegador (F12)
2. Copia todos los mensajes de error
3. Toma un screenshot de la pantalla de login
4. Verifica en Supabase Dashboard si el usuario existe
5. Comparte esta información para obtener ayuda específica

### 🔐 Cuentas de Prueba Recomendadas

Para evitar estos problemas en el futuro, crea cuentas de prueba dedicadas:

```
User Account:
Email: testuser@example.com
Password: Test123!
Role: user
Status: Email verified ✅

Merchant Account:
Email: testmerchant@example.com
Password: Test123!
Role: merchant
Status: Email verified ✅
```

**Importante**: Guarda estas credenciales en un lugar seguro (no en el repositorio).

---

**Última actualización**: Noviembre 2025
