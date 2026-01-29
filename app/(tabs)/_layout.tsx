import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TreatmentProvider from '../context/TreatmentProvider';

export default function TabLayout(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <TreatmentProvider>
        <Tabs screenOptions={{
          tabBarActiveTintColor: '#009183',
          headerShown: false,
          tabBarStyle: {
            height: 80,
            paddingBottom: 10,
          }
        }}>
          <Tabs.Screen
            name="dashboard"
            options={{
              title: 'Painel',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
            }}
          />

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
              title: '',
              tabBarIcon: () => <FontAwesome size={32} name="plus" color="#fff" />,
              tabBarButton: (props) => {
                const { onPress, onLongPress, accessibilityState } = props;
                
                return (
                  <TouchableOpacity
                    onPress={onPress}
                    onLongPress={onLongPress ?? undefined}
                    style={styles.addButton}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.addButtonInner,
                      accessibilityState?.selected && styles.addButtonSelected
                    ]}>
                      <FontAwesome size={32} name="plus" color="#fff" />
                    </View>
                  </TouchableOpacity>
                );
              },
            }}
          />

          <Tabs.Screen
            name="calendar"
            options={{
              title: 'Calendário',
              tabBarIcon: ({ color }) => (
                <View style={styles.iconContainer}>
                  <FontAwesome size={28} name="calendar" color={color} />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Em breve</Text>
                  </View>
                </View>
              ),
              tabBarButton: (props) => {
                return (
                  <TouchableOpacity
                    style={[props.style, styles.disabledTab]}
                    activeOpacity={1}
                    onPress={() => {}} // Não faz nada
                  >
                    {props.children}
                  </TouchableOpacity>
                );
              },
            }}
          />

          <Tabs.Screen
            name="history"
            options={{
              title: 'Histórico',
              tabBarIcon: ({ color }) => (
                <View style={styles.iconContainer}>
                  <FontAwesome size={28} name="history" color={color} />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Em breve</Text>
                  </View>
                </View>
              ),
              tabBarButton: (props) => {
                return (
                  <TouchableOpacity
                    style={[props.style, styles.disabledTab]}
                    activeOpacity={1}
                    onPress={() => {}} // Não faz nada
                  >
                    {props.children}
                  </TouchableOpacity>
                );
              },
            }}
          />
        </Tabs>
      </TreatmentProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  addButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  addButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#009183',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addButtonSelected: {
    backgroundColor: '#009183',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -30,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 8,
    width: 50,
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  disabledTab: {
    opacity: 0.5,
  },
});