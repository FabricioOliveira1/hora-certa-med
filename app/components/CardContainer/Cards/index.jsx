import { Image, StyleSheet, Text, View } from "react-native";

export default function Card({tratamento}) {

  /* id: oldstate.length + 1,
          name: name,
          initialDate: initialDate.toLocaleDateString(),
          interval: interval,
          amount: amount,
          aplicationRoutine: aplicationRoutine,
          tratamento.aplicationRoutine[0]
          nextAplication: nextAplication */
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tratamento.aplicationRoutine[0]}</Text>
      <View style={styles.info}>
        <Image style={styles.image} source={require('../../../../assets/images/logo-24px.png')}/>
        <View style={styles.data}>
        <Text style={styles.title}>{tratamento.name}</Text>
        <Text style={styles.text}>{`${tratamento.amount} unidades restantes`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 80,
    padding: 10,
  },
  info: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent:'center',
    gap: 40
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#009183'
  },
  data: {
    flex: 1
  },
  image: {
   marginLeft:6
  },
  text: {
    fontSize:12,
    color: '#009183'
  }
})