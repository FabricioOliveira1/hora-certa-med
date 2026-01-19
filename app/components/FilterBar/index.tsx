
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FilterType } from '../../types/types';

interface Props {
  active: FilterType;
  onChange: (f: FilterType) => void;
}

const FilterBar: React.FC<Props> = ({ active, onChange }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <TouchableOpacity 
        onPress={() => onChange('Todos')}
        style={[styles.button, active === 'Todos' ? styles.buttonActive : styles.buttonInactive]}
      >
        <FontAwesome name="check" size={16} color={active === 'Todos' ? '#fff' : '#94a3b8'} />
        <Text style={[styles.buttonText, active === 'Todos' ? styles.textActive : styles.textInactive]}>Todos</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onChange('Tomados')}
        style={[styles.button, active === 'Tomados' ? styles.buttonActive : styles.buttonInactive]}
      >
        <FontAwesome name="check" size={16} color={active === 'Todos' ? '#fff' : '#94a3b8'} />
        <Text style={[styles.buttonText, active === 'Tomados' ? styles.textActive : styles.textInactive]}>Tomados</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => onChange('Adiados')}
        style={[styles.button, active === 'Adiados' ? styles.buttonActive : styles.buttonInactive]}
      >
        <FontAwesome name="clock-o" size={16} color={active === 'Todos' ? '#fff' : '#94a3b8'} />
        <Text style={[styles.buttonText, active === 'Adiados' ? styles.textActive : styles.textInactive]}>Adiados</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 60,
    marginBottom: 24,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 12,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonActive: {
    backgroundColor: '#0d9488',
  },
  buttonInactive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  textActive: {
    color: '#fff',
  },
  textInactive: {
    color: '#64748b',
  }
});

export default FilterBar;
