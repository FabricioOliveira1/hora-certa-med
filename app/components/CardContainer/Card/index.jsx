import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import useTreatamentContext from "../../context/useTreatmentContext";

export default function Card({ item }) {

  const { onConsumingMedicine } = useTreatamentContext()
  console.log('item: ', item)

  return (
    <Pressable onPress={() => onConsumingMedicine(item)}>
      <View style={styles.container}>
        <Text style={styles.text}>{item.hour}</Text>
        <View style={styles.info}>
          <Image style={styles.image} source={require('../../../../assets/images/logo-24px.png')} />
          <View style={styles.data}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>{`${item.amount} unidades restantes`}</Text>
          </View>
        </View>
      </View>
    </Pressable>
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
    justifyContent: 'center',
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
    marginLeft: 6
  },
  text: {
    fontSize: 12,
    color: '#009183'
  }
})