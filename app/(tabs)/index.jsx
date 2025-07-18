import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Image source={require("../../assets/images/logo-128px.png")} />
      <Text style={styles.textTitle}>Hora Certa med</Text>
      <Pressable style={styles.button} onPress={() => router.replace('./today')}>
        <Text style={styles.text}>Iniciar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009183',
    gap: 20
  },
  textTitle: {
    fontSize: 36,
    color: "#fff"
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 36,
  },
  text: {
    fontSize: 24
  }
})

