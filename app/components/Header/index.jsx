import { Image, StyleSheet, Text, View } from "react-native";
import ProfileContainer from './ProfileContainer';

export default function Header({children}) {

  return (
    <View style={styles.header}>
      <ProfileContainer/>
      <View style={styles.headerContainer}>
        <Image source={require('../../../assets/images/logo-24px.png')} />
        <Text style={styles.title}>
          {children}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'start',
    padding: 20,
    paddingBottom: 10,
    gap: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 20,
  },
  title: {
    color: "#fff",
    fontFamily: 'open-sans',
    fontSize: 24,
    fontWeight: 'bold'
  },
})