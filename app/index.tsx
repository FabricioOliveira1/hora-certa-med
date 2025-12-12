import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const router = useRouter()
  
  useEffect(() => {

    if(router) {
      const redirect = async () => {
        router.replace("/auth");
      };

      /* colocar logica de verificação se usuario esta logado para ir direto para dashboard dele */
      redirect();
    }
}, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/logo-128px.png')}/>
      <Text style={styles.textTitle} >Hora Certa Med</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009183',
  },
    textTitle: {
    fontSize: 36,
    color: "#fff"
  },
})
