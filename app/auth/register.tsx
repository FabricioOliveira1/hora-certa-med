import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { auth } from '../../firebaseConfig';

export default function RegisterScreen(): React.ReactElement {

  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cleanInputs(): void {
    setName('');
    setEmail('');
    setSenha('');
  }

  async function handleRegister(): Promise<void> {
    if (!name || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log('Usuário registrado com sucesso:');
      Alert.alert('Usuário registrado com sucesso!');
      cleanInputs();
      router.replace('/auth')
    })
    .catch((error: any) => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Erro', 'Este email já está em uso.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Erro', 'Email inválido.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      } else {
        Alert.alert('Erro', 'Não foi possível registrar. Tente novamente mais tarde.');
      } 
      console.error('Erro ao registrar usuário:', error);
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.container}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Crie sua Conta</Text>
          <Text style={styles.label}>Nome do usuário:</Text>
          <TextInput
            autoComplete="name"
            style={styles.input}
            placeholder="Digite seu Nome"
            placeholderTextColor="#999"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text style={styles.label}>Seu email:</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Sua senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={(text) => setSenha(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#009183',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#fff'
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5
  },
  button: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
