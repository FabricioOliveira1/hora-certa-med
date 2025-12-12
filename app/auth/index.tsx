import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Alert, Animated, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebaseConfig";
import  useTreatamentContext  from "../context/useTreatmentContext";  


export default function Index(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(1)).current; // Opacidade inicial 1 para ficar visível.

    const router = useRouter()

  const { setTreatment } = useTreatamentContext()

  async function handleLogin(): Promise<void> {
    try{
      if (email === '' || senha === '') {
        Alert.alert('Erro', 'Preencha todos os campos.');
        return;
      }
      // Faz o login com Firebase Auth
      await signInWithEmailAndPassword(auth, email, senha)
      const user = auth.currentUser;
      console.log("Usuário logado com sucesso:");

      // Busca tratamentos após login
      const tratamentosRef = doc(db, 'users', user?.uid ?? '');
      const docSnap = await getDoc(tratamentosRef);
      console.log("Tratamentos buscados com sucesso! docsnap:", docSnap.data());
      if (docSnap.exists()) {
        setTreatment(docSnap.data().treatment);
        console.log("Tratamentos carregados:", docSnap.data().treatment);
      } else {
        setTreatment([]);
        console.log("Nenhum tratamento encontrado para este usuário.");
      }
      // Navega para a tela de tratamentos
      router.replace('/treatment');

    } catch (error) {
      console.error(error);
        
        Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais.');
        router.replace('/');
    }
  };

  const handleInputFocus = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Valor para desaparecer
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Valor para aparecer
      duration: 500,
      useNativeDriver: true,
    }).start();
  }; 

  return (

     <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.Image
        style={[{ opacity: fadeAnim }]}
        source={require("../../assets/images/logo-128px.png")}
      />
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={100}
          style={styles.formContainer}>
          <Text style={styles.textTitle}>Hora Certa med</Text>
          <View style={styles.form}>
            <Text style={{ color: '#fff', fontSize: 20 }}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              
              onFocus={handleInputFocus}
              onBlur={handleInputBlur} />
            <Text style={{ color: '#fff', fontSize: 20 }}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </View>
          <Pressable style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.text}>Entrar</Text>
          </Pressable>
          <Pressable onPress={() => router.push('./register')}>
            <Text style={{ color: '#fff', fontSize: 18, textDecorationLine: 'underline' }}>Criar uma conta</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView> 

  )
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009183',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009183',
    gap: 20,
  },
  textTitle: {
    fontSize: 36,
    color: "#fff"
  },
  form: {
    width: '80%',
    alignItems: 'flex-end',
    gap: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 36,
    marginTop: 8,
  },
  text: {
    fontSize: 24
  }
}) 