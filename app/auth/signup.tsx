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

export default function SignUpScreen() {
  const { theme } = useTheme();
  const { signUp, signIn, signInWithGoogle, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const styles = createStyles(theme);

  const handleSignUp = async () => {
    setError(''); // Clear previous errors
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signUp(email, password, name);
      
      if (result.error) {
        setError(result.error.userMessage || result.error.message);
      } else if (result.success) {
        if (result.requiresVerification) {
          alert('Account Created! Please check your email and click the confirmation link to complete your registration.');
          setTimeout(() => router.replace('/auth/login'), 1000);
        } else {
          // Account created and user is logged in
          alert('Welcome! Your account has been created successfully and you are now signed in!');
          setTimeout(() => router.replace('/(tabs)'), 1000);
        }
      }
    } catch (err) {
      console.error('SignUp exception:', err);
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
      const result = await signInWithGoogle();
      if (result.error) {
        const errorMessage = result.error.userMessage || result.error.message || 'Google sign up failed';
        setError(errorMessage);
      }
      // Google OAuth handles redirect automatically
    } catch (err) {
      console.error('Google sign up error:', err);
      setError('Unable to connect to Google. Please check your internet connection and try again.');
    }
  };

  const navigateToSignIn = () => {
    try {
      router.back();
    } catch (err) {
      console.error('Navigation error:', err);
      // Fallback navigation
      router.replace('/auth/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>∞</Text>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Infinite Realty Hub</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={theme.colors.textMuted}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

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
            placeholder="Create a password"
            placeholderTextColor={theme.colors.textMuted}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
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
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.lg,
            boxShadow: '0 4px 8px rgba(0, 122, 255, 0.4)',
          }}
          onClick={handleSignUp}
          disabled={isLoading || loading}
        >
          {isLoading || loading ? 'Creating Account...' : 'Create Account'}
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

        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: theme.spacing.sm,
          }}
          onClick={navigateToSignIn}
        >
          <Text style={styles.signInText}>
            Already have an account? <Text style={styles.signInTextAccent}>Sign in</Text>
          </Text>
        </button>
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
    marginBottom: theme.spacing.xl,
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
    marginBottom: theme.spacing.md,
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
  signInLink: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textSecondary,
  },
  signInTextAccent: {
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