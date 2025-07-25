import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Esta pagina esta em desenvolvimento.{'\n'}
        Em breve...
      </Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  }
})