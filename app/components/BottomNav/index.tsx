
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface BottomNavProps {
  activeTab: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const tabs = [
    { name: 'Início', icon: 'home' },
    { name: 'Calendário', icon: 'calendar_month' },
    { name: 'Relatórios', icon: 'bar_chart' },
    { name: 'Perfil', icon: 'person' },
  ];

  return (
    <View style={styles.nav}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.icon, 
              isActive && styles.activeIcon,
              isActive && { fontWeight: '700' }
            ]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    fontFamily: 'Material Symbols Outlined',
    fontSize: 24,
    color: '#cbd5e1',
  },
  activeIcon: {
    color: '#008f81',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
  },
  activeLabel: {
    color: '#008f81',
  },
});

export default BottomNav;
