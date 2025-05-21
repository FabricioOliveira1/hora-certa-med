import { StyleSheet, Text, View } from "react-native";

export default function TretmentCard ({tratamento}) {
  
return (
  <View style={styles.container}>
    <Text  style={styles.title}>
        {tratamento.name}
    </Text>
    <Text>
      Quantidade na Cartela: {tratamento.amount}
    </Text>
    <Text>
      Data de Inicio: {tratamento.initialDate}
    </Text>
    <Text>
      Tomar de {tratamento.interval} em {tratamento.interval} horas.
    </Text>
    <Text>
      Proxima Aplicação: {tratamento.nextAplication}
    </Text>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    gap: 5
  },
  title: {
    fontSize: 24,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#009183'
  }
})