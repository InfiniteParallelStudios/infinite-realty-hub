import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../useTheme';

export default function StoreScreen() {
  const { theme } = useTheme();
  
  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Module Store</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
      <Text style={styles.description}>
        Browse and install modules to extend your real estate toolkit
      </Text>
      
      <View style={styles.previewCard}>
        <Text style={styles.cardTitle}>🏠 Property Management</Text>
        <Text style={styles.cardDescription}>
          Comprehensive property listing and management tools
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Coming Soon</Text>
        </View>
      </View>
      
      <View style={styles.previewCard}>
        <Text style={styles.cardTitle}>📊 Analytics Dashboard</Text>
        <Text style={styles.cardDescription}>
          Real estate market analytics and reporting
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Coming Soon</Text>
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
  previewCard: {
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
    marginBottom: theme.spacing.md,
    width: '100%',
    maxWidth: 400,
  },
  cardTitle: {
    fontSize: theme.typography.fontSizes.lg,
    fontWeight: theme.typography.fontWeights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    fontSize: theme.typography.fontSizes.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    lineHeight: theme.typography.lineHeights.normal * theme.typography.fontSizes.md,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
  },
});
