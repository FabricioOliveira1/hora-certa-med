import { SafeAreaView, StyleSheet } from "react-native";
import CardContainer from "../components/CardContainer";
import Header from "../components/Header";


export default function Today() {

   const medicine = [
      {
        id: 1,
        title: 'Dipirona'
      }
    ]

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        Hoje
      </Header>
      <CardContainer screen={'today'} treatment={medicine}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009183',
    height: '100%',
    justifyContent: 'space-between'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    borderRadius: 36,
  },
  text: {
    fontSize: 24,
  },
  cardContainer: {
    backgroundColor: '#CCCCCC',
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBlock: 20,
    paddingHorizontal: 20,
    gap: 8
  },
  floatButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  footer: {
    backgroundColor: '#009183',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  textFooter: {
    color: '#fff',
    fontSize: 16
  }
})