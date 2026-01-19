import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text } from "react-native";
import 'react-native-get-random-values';
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "./context/useAuthContext";


export default function Index() {

  // Se estiver logado, redirecionar para a tela principal do app
  // Se nao estiver logado, redirecionar para a tela de login

  const { user, isLoading } = useAuth();

  useEffect(() => {

    async function checkLoginStatus() {
      try {
        if (isLoading) {
          return <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
        } else {
          if (!user) {
            router.replace('/auth');
          } else if (user) {
            router.replace('/(tabs)');
          }
        }
        } catch (error) {
          console.error("Erro ao verificar status de login: ", error);
        }
      }
    checkLoginStatus();
    }, [user, isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/logo-128px.png')} />
      <Text style={styles.textTitle}>Hora Certa Med</Text>
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
