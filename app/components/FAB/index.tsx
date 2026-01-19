
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FAB: React.FC = () => {
  return (
    <TouchableOpacity style={styles.fab}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>add</Text>
      </View>
      <Text style={styles.label}>Lembrete</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008f81',
    paddingLeft: 12,
    paddingRight: 20,
    paddingVertical: 10,
    borderRadius: 99,
    shadowColor: '#008f81',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    fontFamily: 'Material Symbols Outlined',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default FAB;
