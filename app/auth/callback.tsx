import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../src/lib/supabase';
import { useTheme } from '../../useTheme';

export default function AuthCallback() {
  const { theme } = useTheme();
  const [status, setStatus] = useState('Processing authentication...');
  const styles = createStyles(theme);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        if (typeof window !== 'undefined') {
          const url = window.location.href;
          console.log('Auth callback URL:', url);

          // Check if this is an OAuth callback with tokens
          const urlParams = new URLSearchParams(window.location.search);
          const accessToken = urlParams.get('access_token');
          const refreshToken = urlParams.get('refresh_token');
          const error = urlParams.get('error');
          const errorDescription = urlParams.get('error_description');

          if (error) {
            console.error('OAuth error:', error, errorDescription);
            setStatus('Authentication failed. Redirecting...');
            setTimeout(() => {
              router.replace('/auth/login');
            }, 2000);
            return;
          }

          if (accessToken && refreshToken) {
            console.log('OAuth tokens found, setting session...');
            setStatus('Authentication successful! Redirecting...');
            
            // Let Supabase handle the session automatically
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) {
              console.error('Session error:', sessionError);
              setStatus('Session error. Redirecting to login...');
              setTimeout(() => {
                router.replace('/auth/login');
              }, 2000);
              return;
            }

            if (session) {
              console.log('Session established, redirecting to app...');
              router.replace('/(tabs)');
            } else {
              console.log('No session found, redirecting to login...');
              router.replace('/auth/login');
            }
          } else {
            console.log('No OAuth tokens found, redirecting to login...');
            setStatus('No authentication data found. Redirecting...');
            setTimeout(() => {
              router.replace('/auth/login');
            }, 2000);
          }
        } else {
          // React Native environment
          setStatus('Authentication completed. Redirecting...');
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        setStatus('Authentication error. Redirecting...');
        setTimeout(() => {
          router.replace('/auth/login');
        }, 2000);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  text: {
    marginTop: theme.spacing.lg,
    fontSize: theme.typography.fontSizes.lg,
    color: theme.colors.text,
    textAlign: 'center',
  },
});