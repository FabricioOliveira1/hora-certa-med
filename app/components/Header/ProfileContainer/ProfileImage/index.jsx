import { Image, StyleSheet, View } from "react-native";

export default function ProfileImage() {
  return (
    <View>
      <Image style={styles.image} source={require('./assets/profile-image.png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    height: 48,
    width: 48
  }
})