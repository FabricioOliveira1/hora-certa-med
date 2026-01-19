
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SegmentedControlProps {
  options: string[];
  active: string;
  onChange: (option: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, active, onChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isActive = active === option;
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onChange(option)}
            style={[styles.button, isActive && styles.activeButton]}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 99,
    padding: 6,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 99,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
  },
  activeText: {
    color: '#008f81',
  },
});

export default SegmentedControl;
