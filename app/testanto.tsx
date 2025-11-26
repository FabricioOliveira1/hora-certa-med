import { StyleSheet, Text, View } from "react-native";

export default function Testanto() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testanto Component</Text>
      <Text style={styles.subtitle}>🎉 Funcionando!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

