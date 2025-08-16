import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const useSessionManager = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const getSession = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session fetch error:', error);
          setError(error.message);
        }
        
        if (mounted) {
          setSession(session);
        }
      } catch (err) {
        console.error('Session exception:', err);
        if (mounted) {
          setError('Failed to fetch session');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Get initial session
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.email || 'No user');
      
      if (mounted) {
        setSession(session);
        setIsLoading(false);
        setError(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const refreshSession = async () => {
    try {
      setError(null);
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      setSession(session);
      return true;
    } catch (err) {
      console.error('Refresh session error:', err);
      setError('Failed to refresh session');
      return false;
    }
  };

  const clearSession = () => {
    setSession(null);
    setError(null);
  };

  return {
    session,
    isLoading,
    error,
    refreshSession,
    clearSession,
    isAuthenticated: !!session?.user,
  };
};