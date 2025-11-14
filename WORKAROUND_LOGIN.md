# Workarounds para Entrar a la App Sin Email Verificado

## 🚨 Problema Actual

Supabase bloquea el login a nivel de API si el email no está verificado. No hay forma de saltarlo desde el código del cliente.

## ✅ Soluciones Disponibles

### Solución 1: Crear Cuenta Nueva con Email Accesible

**Paso 1**: Usa un email al que tengas acceso:

```bash
# Opción A: Ejecutar script
node scripts/createTestAccount.js

# Opción B: Crear manualmente en la app
# Usa: tuemail+test1@gmail.com (Gmail trick)
```

**Paso 2**: Verifica el email inmediatamente
- Revisa tu bandeja de entrada
- Haz clic en el link de Supabase
- Espera 1-2 minutos

**Paso 3**: Haz login con las nuevas credenciales

### Solución 2: Email Temporal

**Paso 1**: Ve a https://temp-mail.org/

**Paso 2**: Copia el email temporal generado

**Paso 3**: Crea cuenta en la app con ese email

**Paso 4**: Vuelve a temp-mail.org y verifica el email

**Paso 5**: Haz login

### Solución 3: Pedir Acceso a Supabase (Recomendado)

Envía este mensaje:

```
Hi, I need access to the Supabase Dashboard to verify test accounts.

Project: https://app.supabase.com/project/ycsqkkupncgzwihmamtu

I need permission to:
- View Authentication → Users
- Confirm email addresses for testing

OR

Please verify this email manually:
- Email: testmail@gmail.com
- Action: Authentication → Users → Find user → Confirm email

Thank you!
```

### Solución 4: Esperar y Usar Cuenta Existente

Si alguien verifica `testmail@gmail.com` por ti:

1. Espera confirmación
2. Ejecuta: `node scripts/testLogin.js`
3. Si dice "Login successful", intenta en la app
4. Usa la URL correcta según el rol

## 🎯 Recomendación

**La mejor opción es Solución 1 o 2**:

1. Crear cuenta con email accesible
2. Verificar inmediatamente
3. Hacer login

Esto te da control total y no dependes de nadie.

## 📝 Comandos Útiles

```bash
# Crear nueva cuenta
node scripts/createTestAccount.js

# Verificar si una cuenta funciona
node scripts/testLogin.js

# Listar usuarios existentes
node scripts/listUsers.js

# Verificar cuenta específica
node scripts/checkAccount.js
```

## ⏰ Timeline Estimado

| Solución | Tiempo | Dependencias |
|----------|--------|--------------|
| Email temporal | 5 min | Ninguna |
| Gmail trick | 5 min | Tener Gmail |
| Script nuevo | 5 min | Acceso a email |
| Pedir acceso | 1-24 hrs | Otra persona |
| Esperar verificación | ? | Otra persona |

## 🔧 Última Opción: Mock de Desarrollo

Si absolutamente necesitas entrar YA sin verificación, puedo crear un mock del servicio de auth que simule un login exitoso solo para ver la UI. Pero no tendrás datos reales.

¿Quieres que cree eso?

---

**Recomendación Final**: Ejecuta `node scripts/createTestAccount.js` y usa un email temporal o Gmail trick.
