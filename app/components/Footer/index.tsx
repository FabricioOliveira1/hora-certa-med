import React from 'react'
import { StyleSheet, Text, View } from "react-native";

export default function Footer(): React.ReactElement {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Desenvolvido por estacio@alunos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#009183',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
})
