# Verificación de Cuenta de Prueba

## Credenciales Proporcionadas

```
Email: testmail@gmail.com
Password: testpassword@@
```

## Pasos para Diagnosticar el Problema

### Opción 1: Ejecutar Script de Verificación (Recomendado)

```bash
node scripts/checkAccount.js
```

Este script verificará:
- ✅ Si la cuenta existe en la tabla `users`
- ✅ Si las credenciales son correctas
- ✅ Si el email está verificado
- ✅ Qué rol tiene asignado

### Opción 2: Verificación Manual en Supabase Dashboard

1. **Ir al Dashboard de Supabase**
   - URL: https://app.supabase.com/project/ycsqkkupncgzwihmamtu
   - O: https://supabase.com/dashboard

2. **Verificar en Authentication → Users**
   - Busca: `testmail@gmail.com`
   - Verifica que exista
   - Verifica columna `email_confirmed_at` (debe tener una fecha)
   - Si NO está confirmado: Haz clic en los 3 puntos → "Confirm email"

3. **Verificar en Table Editor → users**
   - Busca: `testmail@gmail.com`
   - Verifica que el registro exista
   - Verifica el campo `role` (debe ser "user" o "merchant")

### Opción 3: Verificación desde la Consola del Navegador

1. Abre la aplicación: http://localhost:3000
2. Abre DevTools (F12)
3. Ve a la pestaña **Console**
4. Intenta hacer login con las credenciales
5. Observa los mensajes de error

## Problemas Comunes y Soluciones

### Problema 1: Email No Verificado ⚠️

**Síntoma**: Login falla incluso con credenciales correctas

**Verificar**:
```javascript
// En Supabase Dashboard → Authentication → Users
// Buscar testmail@gmail.com
// Columna "email_confirmed_at" debe tener una fecha
```

**Solución A - Dashboard**:
1. Supabase Dashboard → Authentication → Users
2. Buscar `testmail@gmail.com`
3. Clic en los 3 puntos (⋮)
4. Seleccionar "Confirm email"

**Solución B - Email**:
1. Revisar bandeja de entrada de `testmail@gmail.com`
2. Buscar email de Supabase
3. Hacer clic en el link de verificación

### Problema 2: Rol Incorrecto 🎭

**Síntoma**: Login funciona pero luego redirige o falla

**Verificar el rol**:
- Si el rol es "user" → Usar: http://localhost:3000/
- Si el rol es "merchant" → Usar: http://localhost:3000/merchant

**Cambiar página según el rol**:
```
Rol "user"     → Login en: http://localhost:3000/
Rol "merchant" → Login en: http://localhost:3000/merchant
```

### Problema 3: Cuenta No Existe 🚫

**Síntoma**: "Invalid login credentials"

**Verificar**:
1. Ejecutar: `node scripts/checkAccount.js`
2. O revisar Supabase Dashboard

**Solución**: Crear la cuenta
1. Esperar 10-15 minutos (rate limit)
2. Ir a la página de signup
3. Crear cuenta con estas credenciales
4. **IMPORTANTE**: Verificar el email inmediatamente

### Problema 4: Password Incorrecto 🔑

**Síntoma**: "Invalid login credentials"

**Verificar**:
- Password: `testpassword@@` (con dos arrobas al final)
- Sin espacios antes o después
- Sensible a mayúsculas/minúsculas

**Solución**: Confirmar password con quien proporcionó la cuenta

## Checklist de Verificación

Antes de intentar login, verifica:

- [ ] La aplicación está corriendo en http://localhost:3000
- [ ] Email: `testmail@gmail.com` (sin espacios)
- [ ] Password: `testpassword@@` (dos arrobas)
- [ ] Email está verificado en Supabase
- [ ] Estás en la página correcta según el rol
- [ ] No hay errores en la consola del navegador

## Comandos Útiles

```bash
# Verificar cuenta específica
node scripts/checkAccount.js

# Listar todos los usuarios
node scripts/listUsers.js

# Iniciar aplicación
npm start
```

## Próximos Pasos

1. **Ejecuta el script de verificación**:
   ```bash
   node scripts/checkAccount.js
   ```

2. **Lee el output del script** - Te dirá exactamente cuál es el problema

3. **Sigue las instrucciones** del script para resolver el problema

4. **Intenta hacer login nuevamente**

## Notas Importantes

⚠️ **Si el email no está verificado**, el login SIEMPRE fallará, incluso con credenciales correctas.

✅ **Después de verificar el email**, espera 1-2 minutos antes de intentar login.

🔄 **Si cambias algo en Supabase**, refresca la página de la aplicación (Ctrl+R).

---

**Última actualización**: Noviembre 2025
