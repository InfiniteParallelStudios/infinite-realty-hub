import { View, Text, StyleSheet } from 'react-native';

export default function StoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Module Store</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
      <Text style={styles.description}>
        Browse and install modules to extend your real estate toolkit
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
