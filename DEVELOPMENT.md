# Development Guide - SmartPay

## Local Development Setup

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### 2. Environment Configuration

Create a `.env` file in the root directory (use `.env.example` as template):

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note**: Currently, Supabase credentials are hardcoded in `src/supabaseClient.jsx`. For production, migrate to environment variables.

### 3. Known Issues & Solutions

> 📖 **For login issues**, see detailed guide: [`LOGIN_TROUBLESHOOTING.md`](./LOGIN_TROUBLESHOOTING.md)

#### Supabase Rate Limiting (429 Errors)

**Problem**: Too many signup/login attempts in a short period.

**Solutions**:
- Wait 5-10 minutes before retrying
- Use existing test accounts instead of creating new ones
- Implement request throttling in production
- Consider adding CAPTCHA for public-facing forms

#### Anonymous Sign-ins Disabled

**Problem**: Supabase project has anonymous authentication disabled.

**Solution**: 
1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable anonymous sign-ins if needed, or ensure users provide valid credentials

#### React Router Future Flags Warnings

**Status**: ✅ Fixed

The app now includes React Router v7 future flags in `App.js`:
```javascript
<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
```

### 4. Development Workflow

#### Running the App
```bash
npm start          # Start dev server
npm test           # Run tests
npm run build      # Build for production
```

#### Code Quality
```bash
npx prettier --check "src/**/*.{js,jsx}"    # Check formatting
npx prettier --write "src/**/*.{js,jsx}"    # Fix formatting
```

### 5. Architecture Overview

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms
│   ├── checkout/       # Payment & checkout components
│   ├── common/         # Shared components (navbar, etc.)
│   └── dashboard/      # Dashboard components
├── pages/              # Page-level components
├── redux/              # State management
│   ├── auth/          # Auth state
│   ├── checkout/      # Checkout state
│   └── dashboard/     # Dashboard state
├── router/             # Route configuration
├── services/           # API services (Supabase)
├── layouts/            # Layout components
└── supabaseClient.jsx  # Supabase initialization
```

### 6. Testing Strategy

#### Unit Tests
```bash
npm test
```

#### Finding Test Accounts

See `TEST_ACCOUNTS.md` for detailed instructions. Quick options:

1. **Supabase Dashboard**: https://app.supabase.com → Authentication → Users
2. **Run script**: `node scripts/listUsers.js`
3. **Browser Storage**: DevTools → Application → Local Storage → `authUser`

#### Manual Testing Checklist
- [ ] User signup flow
- [ ] Merchant signup flow
- [ ] Login with existing credentials
- [ ] Checkout process
- [ ] Payment method selection (Fiat/Crypto)
- [ ] Dashboard data display
- [ ] Logout functionality

### 7. Common Development Tasks

#### Adding a New Route
1. Create page component in `src/pages/`
2. Add route in `src/router/AppRouter.jsx`
3. Add navigation link if needed

#### Adding a New Redux Action
1. Define action types in `redux/[feature]/[feature]Types.js`
2. Create action creators in `redux/[feature]/actions.js`
3. Update reducer in `redux/[feature]/reducer.js`

#### Styling with Tailwind
- Use Tailwind utility classes
- Custom styles in `tailwind.config.js`
- Component-specific styles using `@apply` in CSS modules

### 8. Browser DevTools

**Recommended Extensions**:
- React Developer Tools
- Redux DevTools
- MetaMask (for crypto wallet testing)

### 9. Performance Tips

- Use React.memo() for expensive components
- Implement code splitting with React.lazy()
- Optimize images and assets
- Monitor bundle size with `npm run build`

### 10. Security Considerations

⚠️ **Important**:
- Never commit `.env` files
- Rotate Supabase keys if exposed
- Implement rate limiting on API calls
- Validate all user inputs
- Use HTTPS in production

### 11. Deployment Checklist

- [ ] Update environment variables
- [ ] Run production build (`npm run build`)
- [ ] Test build locally (`npx serve -s build`)
- [ ] Check bundle size
- [ ] Verify all API endpoints
- [ ] Test authentication flow
- [ ] Configure CORS if needed

### 12. Support & Resources

- [Create React App Docs](https://create-react-app.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)

---

**Last Updated**: November 2025
