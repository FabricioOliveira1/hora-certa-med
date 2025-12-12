import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TreatmentProvider from '../context/TreatmentProvider'; 

export default function TabLayout(): React.ReactElement {
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <TreatmentProvider>
        <Tabs screenOptions={{
          tabBarActiveTintColor: '#009183',
          headerShown: false,
          tabBarStyle: {
            height: 80
          }
        }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'login',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
              tabBarStyle: {
                display: 'none',
              },
              tabBarItemStyle: {
                display: 'none',
              }
            }}
          />
          <Tabs.Screen
            name="register"
            options={{
              title: '',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
              tabBarStyle: {
                display: 'none',
              },
              tabBarItemStyle: {
                display: 'none',
              },
              headerShown: true,
              headerStyle: {
                backgroundColor: '#009183',
                borderWidth: 0
              },
              headerLeft: () =>
                <Ionicons
                  onPress={() => router.push('./')}
                  size={28} name="arrow-back"
                  color={'#fff'}
                  style={{ marginLeft: 16 }} />
              
            }}
          />
          <Tabs.Screen
            name="today"
            options={{
              title: 'Hoje',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
            }}
          />
          <Tabs.Screen
            name="treatment"
            options={{
              title: 'Tratamentos',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="medkit" color={color} />,
            }}
          />
          <Tabs.Screen
            name="calendar"
            options={{
              title: 'Calendario',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: 'Histórico',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
            }}
          />
          <Tabs.Screen
            name="addTreatment"
            options={{
              title: '',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
              headerShown: true,
              headerStyle: {
                backgroundColor: '#009183',
                borderWidth: 0
              },
              headerLeft: () =>
                <Ionicons
                  onPress={() => router.push('./today')}
                  size={28} name="arrow-back"
                  color={'#fff'}
                  style={{ marginLeft: 16 }} />
              ,
              tabBarStyle: {
                display: 'none',
              },
              tabBarItemStyle: {
                display: 'none'
              }
            }}
          />
        </Tabs>
      </TreatmentProvider>
    </SafeAreaProvider>
  );
}
