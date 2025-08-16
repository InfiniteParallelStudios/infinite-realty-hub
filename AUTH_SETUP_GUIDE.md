# Supabase Authentication Setup Guide for Expo Web

This document provides the complete setup and configuration for Supabase authentication in your Expo React Native web app.

## Issues Resolved

1. **Email/Password signup creates users but can't sign in** - Fixed with improved session handling and error detection
2. **Generic "Invalid login credentials" errors** - Enhanced with specific error messages
3. **Email confirmation handling** - Automated immediate signin attempt after signup
4. **Google OAuth integration** - Proper redirect URL configuration
5. **Session persistence** - Cross-platform storage adapter

## Key Changes Made

### 1. Enhanced Supabase Client Configuration
- **PKCE Flow**: Enabled for better security
- **Cross-platform Storage**: Works for both web and React Native
- **Consistent Storage Key**: Prevents session conflicts
- **Session Detection**: Proper URL detection for OAuth callbacks

### 2. Improved Authentication Context
- **Better Error Handling**: Specific error messages for different scenarios
- **Automatic Signin**: Attempts immediate signin after successful signup
- **Session Management**: Enhanced state management with proper cleanup
- **OAuth Configuration**: Proper redirect URL handling

### 3. Enhanced UI Components
- **Login Component**: Better error display and user feedback
- **Signup Component**: Improved flow with proper success/error handling
- **OAuth Callback**: Dedicated handler for OAuth redirects

### 4. Utility Functions
- **Error Parsing**: Standardized error handling across the app
- **Session Management**: Reusable hook for session state
- **Auth Configuration**: Environment-specific URL handling

## Supabase Dashboard Configuration

### Required Settings

1. **Authentication Settings**:
   - Go to Authentication > Settings
   - Set Site URL: `http://localhost:8092` (development) or your production URL
   - Add redirect URLs:
     - `http://localhost:8092/auth/callback`
     - `http://localhost:8092/(tabs)`
     - Your production URLs

2. **Email Templates** (Optional):
   - Go to Authentication > Email Templates
   - Customize confirmation email if needed
   - For development, consider disabling email confirmation

3. **Google OAuth** (if using):
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials
   - Set redirect URL in Google Console to match Supabase settings

### Development vs Production

#### Development Setup
```bash
# Start Expo development server
npx expo start --web --port 8092

# Site URL in Supabase: http://localhost:8092
# Redirect URLs: http://localhost:8092/auth/callback
```

#### Production Setup
```bash
# Build for production
npx expo build:web

# Update Supabase Site URL to your production domain
# Update redirect URLs to match production domain
```

## Testing the Authentication Flow

### Email/Password Authentication
1. **Signup**:
   - User fills signup form
   - Account is created in Supabase
   - Automatic signin attempt is made
   - User is either logged in immediately or directed to signin

2. **Signin**:
   - User enters credentials
   - Enhanced error messages provide specific feedback
   - Successful login redirects to main app

### Google OAuth
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. After consent, redirected to `/auth/callback`
4. Callback handler processes tokens and creates session
5. User is redirected to main app

## Troubleshooting

### Common Issues and Solutions

1. **"Invalid login credentials" for new users**:
   - Check if email confirmation is required
   - Verify user exists in Supabase Auth dashboard
   - Try the automated signin after signup

2. **Google OAuth not working**:
   - Verify redirect URLs match in both Supabase and Google Console
   - Check that Google OAuth is enabled in Supabase
   - Ensure correct client ID and secret are configured

3. **Session not persisting**:
   - Clear browser storage/cache
   - Check that storage adapter is working correctly
   - Verify PKCE flow is properly configured

4. **CORS errors**:
   - Ensure Site URL is correctly set in Supabase
   - Check that all redirect URLs are whitelisted

### Debug Commands

```javascript
// Check current session
const { data: { session } } = await supabase.auth.getSession();
console.log('Current session:', session);

// Check user
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);

// Clear session (for testing)
await supabase.auth.signOut();
```

## Best Practices

1. **Error Handling**: Always provide user-friendly error messages
2. **Session Management**: Use the provided session hooks for state management
3. **Security**: Keep PKCE flow enabled for production
4. **Testing**: Test both email/password and OAuth flows thoroughly
5. **Monitoring**: Monitor Supabase logs for authentication issues

## File Structure

```
src/
├── lib/
│   └── supabase.ts              # Enhanced Supabase client
├── contexts/
│   └── AuthContext.tsx          # Improved auth context
├── hooks/
│   └── useSessionManager.ts     # Session management hook
├── utils/
│   ├── authErrors.ts           # Error handling utilities
│   └── authConfig.ts           # Auth configuration helpers
app/
├── auth/
│   ├── login.tsx               # Enhanced login component
│   ├── signup.tsx              # Improved signup component
│   └── callback.tsx            # OAuth callback handler
```

This setup provides a robust, production-ready authentication system that handles both email/password and OAuth authentication seamlessly across web and native platforms.