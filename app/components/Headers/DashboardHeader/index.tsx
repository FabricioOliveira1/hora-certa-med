import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProfileImage from "../DashboardHeader/ProfileImage";

export default function ProfileContainer(): React.ReactElement {

  const name: string = 'Fabricio'

  return (
      <View style={styles.profileContainer}>
        <ProfileImage />
        <Text style={styles.title}> Olá, {name}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity style={styles.notificationBtn}>
            <FontAwesome name="bell" size={20} color="#fff" />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
  title: {
    color: "#fff",
    fontFamily: 'open-sans',
    fontSize: 24,
    fontWeight: 'bold'
  },
    notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(255,255,255,0.2)',
  },
    badge: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f87171',
    borderWidth: 2,
    borderColor: '#009183',
  }
})
