import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { parseAuthError, AuthError } from '../utils/authErrors';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: AuthError; success?: boolean }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: AuthError; success?: boolean; requiresVerification?: boolean }>;
  signInWithGoogle: () => Promise<{ error?: AuthError; success?: boolean }>;
  signOut: () => Promise<{ error?: AuthError; success?: boolean }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthContext: Error getting session:', error);
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('AuthContext: Session error:', error);
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthContext: Auth state change:', event);
      
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        const parsedError = parseAuthError(error);
        return { error: parsedError, success: false };
      }
      
      return { success: true };
    } catch (error) {
      const parsedError = parseAuthError(error);
      return { error: parsedError, success: false };
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
          },
        },
      });
      
      if (error) {
        const parsedError = parseAuthError(error);
        return { error: parsedError, success: false };
      }
      
      // Check if user needs email verification
      const hasUser = !!data?.user;
      const hasSession = !!data?.session;
      
      if (hasUser && !hasSession) {
        // User created but needs verification
        return { success: true, requiresVerification: true };
      } else if (hasUser && hasSession) {
        // User created and logged in immediately
        return { success: true, requiresVerification: false };
      }
      
      return { success: true };
    } catch (error) {
      const parsedError = parseAuthError(error);
      return { error: parsedError, success: false };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/(tabs)`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) {
        const parsedError = parseAuthError(error);
        return { error: parsedError, success: false };
      }
      
      return { success: true };
    } catch (error) {
      const parsedError = parseAuthError(error);
      return { error: parsedError, success: false };
    }
  };

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error refreshing session:', error);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
    } catch (error) {
      console.error('Refresh session error:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        const parsedError = parseAuthError(error);
        return { error: parsedError, success: false };
      } else {
        // Clear local state immediately
        setSession(null);
        setUser(null);
        return { success: true };
      }
    } catch (error) {
      const parsedError = parseAuthError(error);
      // Force clear state even if signOut fails
      setSession(null);
      setUser(null);
      return { error: parsedError, success: false };
    }
  };

  const value: AuthContextValue = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};