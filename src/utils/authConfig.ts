// Authentication configuration utilities for Expo web

export const getAppUrl = (): string => {
  if (typeof window !== 'undefined') {
    // Web environment
    return window.location.origin;
  }
  
  // Default for development
  return 'http://localhost:8092';
};

export const getRedirectUrl = (path: string = '/(tabs)'): string => {
  const baseUrl = getAppUrl();
  return `${baseUrl}${path}`;
};

export const handleAuthRedirect = (url: string) => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(new URL(url).search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    const tokenType = urlParams.get('token_type');
    
    if (accessToken && refreshToken) {
      console.log('Handling auth redirect with tokens');
      // Tokens will be automatically handled by Supabase client
      return true;
    }
  }
  
  return false;
};

// Environment-specific URLs for OAuth providers
export const getOAuthRedirectUrl = (): string => {
  const baseUrl = getAppUrl();
  
  // For web, redirect to the auth callback
  if (typeof window !== 'undefined') {
    return `${baseUrl}/auth/callback`;
  }
  
  // For native, use deep linking
  return 'infiniterealityhub://auth/callback';
};