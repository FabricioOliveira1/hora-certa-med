import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TreatmentProvider from '../context/TreatmentProvider';

export default function TabLayout(): React.ReactElement {
/*   const router = useRouter();
 */  return (
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
            name="dashboard"
            options={{
              title: 'Painel',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
              /* tabBarStyle: {
                display: 'none',
              }, */
              /* tabBarItemStyle: {
                display: 'none',
              } */
            }}
          />
          {/* <Tabs.Screen
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
          /> */}
          {/* <Tabs.Screen
            name="today"
            options={{
              title: 'Hoje',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
            }}
          /> */}
          <Tabs.Screen
            name="treatments"
            options={{
              title: 'Tratamentos',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="medkit" color={color} />,
            }}
          />
          <Tabs.Screen
            name="addTreatment"
            options={{
              title: 'Novo',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} style={{ backgroundColor: 'transparent' }} />,
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
          {/* <Tabs.Screen
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
          /> */}
        </Tabs>
      </TreatmentProvider>
    </SafeAreaProvider>
  );
}
