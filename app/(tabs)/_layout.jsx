import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import TreatmentProvider from '../components/context/TreatmentProvider';

export default function TabLayout() {
  return (
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
              title: 'index',
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
                  onPress={() => router.navigate('./today')}
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
  );
}
