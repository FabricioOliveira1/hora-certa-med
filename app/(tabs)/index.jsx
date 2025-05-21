import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function Index() {

  return (
    <SafeAreaView style={styles.container}>
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
    width: '100%',
    height: '100%',
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

