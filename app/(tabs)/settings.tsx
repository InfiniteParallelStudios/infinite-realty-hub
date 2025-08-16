import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure Your Experience</Text>
      <Text style={styles.description}>
        Customize themes, manage modules, and adjust preferences
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    lineHeight: 24,
  },
});
