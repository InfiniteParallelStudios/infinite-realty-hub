// Utility for parsing and handling authentication errors
export interface AuthError {
  message: string;
  type: 'validation' | 'auth' | 'network' | 'unknown';
  userMessage: string;
}

export const parseAuthError = (error: any): AuthError => {
  const errorMessage = error?.message || error?.error_description || error?.toString() || 'Unknown error';
  
  // Handle common Supabase auth errors
  if (errorMessage.includes('Invalid login credentials')) {
    return {
      message: errorMessage,
      type: 'auth',
      userMessage: 'Invalid email or password. Please check your credentials and try again.',
    };
  }
  
  if (errorMessage.includes('User already registered')) {
    return {
      message: errorMessage,
      type: 'validation',
      userMessage: 'An account with this email already exists. Please sign in instead.',
    };
  }
  
  if (errorMessage.includes('Email not confirmed')) {
    return {
      message: errorMessage,
      type: 'auth',
      userMessage: 'Please check your email and click the confirmation link before signing in.',
    };
  }
  
  if (errorMessage.includes('Password should be at least')) {
    return {
      message: errorMessage,
      type: 'validation',
      userMessage: 'Password must be at least 6 characters long.',
    };
  }
  
  if (errorMessage.includes('Invalid email')) {
    return {
      message: errorMessage,
      type: 'validation',
      userMessage: 'Please enter a valid email address.',
    };
  }
  
  if (errorMessage.includes('signup disabled')) {
    return {
      message: errorMessage,
      type: 'auth',
      userMessage: 'Account creation is temporarily disabled. Please try again later.',
    };
  }
  
  if (errorMessage.includes('Too many requests')) {
    return {
      message: errorMessage,
      type: 'network',
      userMessage: 'Too many attempts. Please wait a moment before trying again.',
    };
  }
  
  // Network/connection errors
  if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('Failed to load')) {
    return {
      message: errorMessage,
      type: 'network',
      userMessage: 'Connection error. Please check your internet connection and try again.',
    };
  }
  
  // Default fallback
  return {
    message: errorMessage,
    type: 'unknown',
    userMessage: 'Something went wrong. Please try again.',
  };
};