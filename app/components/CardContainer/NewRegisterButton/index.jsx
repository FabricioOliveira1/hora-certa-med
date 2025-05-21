import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";


export default function NewRegisterButton({ children, screen }) {

  return (
      <Pressable
        style={styles[`${screen}`]}
        onPress={() => router.navigate('../addTreatment')}
      >
        {screen === 'today' ? <Text style={styles.displayNone}>{children}</Text> : <Text style={styles.text}>{children}</Text>}
        
        <Image source={require('../assets/botao-adicionar-64-filled.png')} />
      </Pressable>
  )
}

const styles = StyleSheet.create({
  today: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#009183',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 30
  },
  treatment: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#009183',
    paddingHorizontal: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  text: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold'
  },
  displayNone: {
    display: 'none'
  }
})