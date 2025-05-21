import { StyleSheet, Text, View } from "react-native";
import ProfileImage from "./ProfileImage";

export default function ProfileContainer() {
  return (
      <View style={styles.profileContainer}>
        <ProfileImage />
        <Text style={styles.title}> Olá, Fabricio</Text>
      </View>
  )
}
const styles = StyleSheet.create({
  profileContainer: {
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
  }
})