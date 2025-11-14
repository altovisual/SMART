# Test Accounts Guide

## Current Situation

⚠️ **Rate Limit Active**: Supabase is currently blocking new signups due to too many attempts. Wait 10-15 minutes before creating new accounts.

## How to Find Existing Test Accounts

### Method 1: Supabase Dashboard (Easiest)

1. Go to: https://app.supabase.com/project/ycsqkkupncgzwihmamtu
2. Navigate to: **Authentication** → **Users**
3. You'll see all registered users with their emails
4. Click on a user to see details (but not passwords)

### Method 2: Query the Database

Run the provided script:

```bash
node scripts/listUsers.js
```

This will show all users in the `users` table with their roles.

### Method 3: Check Browser DevTools

If you recently signed up:
1. Open Browser DevTools (F12)
2. Go to **Application** → **Local Storage**
3. Look for `authUser` key
4. This shows your currently logged-in user

## Creating New Test Accounts

### Wait for Rate Limit to Clear

Current rate limit will clear in approximately **10-15 minutes** from your last signup attempt.

### Recommended Test Accounts Structure

Once you can create accounts again, use this pattern:

#### User Accounts (Customers)
```
Email: user1@test.com
Password: Test123!
Role: user
```

```
Email: user2@test.com
Password: Test123!
Role: user
```

#### Merchant Accounts
```
Email: merchant1@test.com
Password: Test123!
Role: merchant
```

```
Email: merchant2@test.com
Password: Test123!
Role: merchant
```

## Using Existing Accounts

If you have existing accounts but forgot the password:

### Option A: Password Reset (if email is configured)
1. Go to the login page
2. Click "Forgot Password"
3. Enter your email
4. Check your inbox for reset link

### Option B: Supabase Dashboard Reset
1. Go to Supabase Dashboard → Authentication → Users
2. Find the user
3. Click on the user
4. Use "Send Password Recovery" or "Send Magic Link"

### Option C: Create New Account with Different Email
Use a temporary email service:
- https://temp-mail.org/
- https://10minutemail.com/
- Or use Gmail's `+` trick: `youremail+test1@gmail.com`

## Troubleshooting

### "Email rate limit exceeded"
- **Wait**: 10-15 minutes
- **Use existing account**: Try logging in instead
- **Check Supabase Dashboard**: See if account was created

### "Anonymous sign-ins are disabled"
- **Provide credentials**: Don't leave email/password empty
- **Use valid email format**: example@domain.com

### "User already registered"
- **Try logging in**: The account exists
- **Use different email**: Or reset password

## Quick Reference

| What You Need | Where to Find It |
|---------------|------------------|
| Existing users | Supabase Dashboard > Authentication > Users |
| User emails | Run `node scripts/listUsers.js` |
| Your logged-in user | Browser DevTools > Local Storage > authUser |
| Create new account | Wait for rate limit, then use signup form |

## Development Best Practices

1. **Document test credentials** in a secure location (not in git)
2. **Use consistent passwords** for test accounts (e.g., `Test123!`)
3. **Create both user and merchant accounts** for full testing
4. **Don't spam signup** - creates rate limit issues
5. **Use the login form** when testing, not signup

---

**Last Updated**: November 2025
**Rate Limit Status**: ⚠️ Active (wait 10-15 minutes)
