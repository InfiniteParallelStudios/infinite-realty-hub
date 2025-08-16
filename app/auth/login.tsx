import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Pressable,
  StyleSheet, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { useTheme } from '../../useTheme';
import { useAuth } from '../../src/contexts/AuthContext';
import { router } from 'expo-router';

export default function LoginScreen() {
  const { theme } = useTheme();
  const { signIn, signInWithGoogle, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const styles = createStyles(theme);

  const handleSignIn = async () => {
    setError(''); // Clear previous errors
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      
      if (result.error) {
        setError(result.error.userMessage || result.error.message);
      } else if (result.success) {
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error('SignIn exception:', err);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      // Check for specific error types
      if (err?.message?.includes('network') || err?.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (err?.message?.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(''); // Clear previous errors
    try {
      console.log('Attempting Google sign in');
      const result = await signInWithGoogle();
      if (result.error) {
        console.error('Google sign in error:', result.error);
        const errorMessage = result.error.userMessage || result.error.message || 'Google sign in failed';
        setError(errorMessage);
      }
      // No need to redirect here as Google OAuth handles the redirect
    } catch (err) {
      console.error('Google sign in exception:', err);
      let errorMessage = 'Google sign in failed. Please try again.';
      
      if (err?.message?.includes('network') || err?.message?.includes('fetch')) {
        errorMessage = 'Unable to connect to Google. Please check your internet connection and try again.';
      } else if (err?.message?.includes('popup')) {
        errorMessage = 'Google sign in popup was blocked. Please allow popups and try again.';
      }
      
      setError(errorMessage);
    }
  };

  const navigateToSignUp = () => {
    try {
      router.push('/auth/signup');
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Unable to navigate to sign up page. Please refresh the page.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>∞</Text>
        <Text style={styles.title}>Infinite Realty Hub</Text>
        <Text style={styles.subtitle}>Welcome back</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={theme.colors.textMuted}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <button
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: theme.borderRadius.md,
            padding: theme.spacing.md,
            fontSize: theme.typography.fontSizes.lg,
            fontWeight: theme.typography.fontWeights.semibold,
            cursor: 'pointer',
            width: '100%',
            marginBottom: theme.spacing.lg,
            boxShadow: '0 4px 8px rgba(0, 122, 255, 0.4)',
          }}
          onClick={handleSignIn}
          disabled={isLoading || loading}
        >
          {isLoading || loading ? 'Loading...' : 'Sign In'}
        </button>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable 
          style={({ pressed }) => [
            styles.googleButton, 
            pressed && { opacity: 0.7 }
          ]} 
          onPress={handleGoogleSignIn}
          disabled={isLoading || loading}
        >
          <Text style={styles.googleButtonText}>🔍 Continue with Google</Text>
        </Pressable>

        <TouchableOpacity style={styles.signUpLink} onPress={navigateToSignUp}>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpTextAccent}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logo: {
    fontSize: theme.typography.fontSizes.xxxl * 1.5,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
    fontWeight: theme.typography.fontWeights.bold,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.text,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    cursor: 'pointer',
    userSelect: 'none',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
  },
  signUpLink: {
    alignItems: 'center',
  },
  signUpText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textSecondary,
  },
  signUpTextAccent: {
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeights.semibold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textMuted,
  },
  googleButton: {
    backgroundColor: theme.colors.cardBackground,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    cursor: 'pointer',
    userSelect: 'none',
  },
  googleButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.medium,
  },
  errorContainer: {
    backgroundColor: '#fee',
    borderWidth: 1,
    borderColor: '#fcc',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: '#c33',
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    textAlign: 'center',
  },
});