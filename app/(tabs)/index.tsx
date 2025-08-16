import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../useTheme';
import { useAuth } from '../../src/contexts/AuthContext';
import { supabase } from '../../src/lib/supabase';

export default function DashboardScreen() {
  const { theme } = useTheme();
  const { user, session, loading, refreshSession } = useAuth();
  
  console.log('Dashboard - Auth State:', { 
    user: user?.email || 'No user', 
    session: !!session, 
    loading 
  });

  const testAuth = async () => {
    console.log('Testing Supabase connection...');
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log('Manual session check:', { data, error });
      
      if (data.session) {
        console.log('Found session:', data.session.user.email);
      } else {
        console.log('No session found');
      }
    } catch (err) {
      console.error('Session test error:', err);
    }
  };
  
  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome to Infinite Realty Hub</Text>
      <Text style={styles.description}>
        Your modular real estate management platform
      </Text>

      {/* Debug Authentication State */}
      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>Auth Debug</Text>
        <Text style={styles.debugText}>Loading: {loading ? 'Yes' : 'No'}</Text>
        <Text style={styles.debugText}>User: {user?.email || 'Not logged in'}</Text>
        <Text style={styles.debugText}>Session: {session ? 'Active' : 'None'}</Text>
        <Text style={styles.debugText}>Provider: {user?.app_metadata?.provider || 'None'}</Text>
        
        <TouchableOpacity style={styles.testButton} onPress={testAuth}>
          <Text style={styles.testButtonText}>Test Auth Connection</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.refreshButton} onPress={refreshSession}>
          <Text style={styles.testButtonText}>Refresh Session</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Active Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Modules Installed</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    marginBottom: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  description: {
    fontSize: theme.typography.fontSizes.md,
    textAlign: 'center',
    color: theme.colors.textMuted,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.md,
    marginBottom: theme.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: theme.spacing.md,
  },
  statCard: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 120,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: theme.typography.fontSizes.xxxl,
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  debugSection: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.cardBorder,
  },
  debugTitle: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  debugText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  testButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.sm,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
  },
  refreshButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.xs,
    alignItems: 'center',
  },
});
