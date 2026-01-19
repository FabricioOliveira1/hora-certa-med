
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CalendarStrip: React.FC = () => {
  const days = [
    { label: 'D', num: '22' },
    { label: 'S', num: '23' },
    { label: 'T', num: '24', selected: true },
    { label: 'Q', num: '25' },
    { label: 'Q', num: '26' },
    { label: 'S', num: '27' },
    { label: 'S', num: '28' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="chevron-left" size={20} color="#0d9488" />
        </TouchableOpacity>
        <Text style={styles.title}>Outubro 2023</Text>
        <TouchableOpacity>
          <FontAwesome name="chevron-right" size={20} color="#0d9488" />
        </TouchableOpacity>
      </View>

      <View style={styles.daysContainer}>
        {days.map((day, idx) => (
          <TouchableOpacity key={idx} style={styles.dayItem}>
            <Text style={styles.dayLabel}>{day.label}</Text>
            <View style={[
              styles.dayCircle,
              day.selected && styles.dayCircleSelected
            ]}>
              <Text style={[
                styles.dayNum,
                day.selected && styles.dayNumSelected
              ]}>
                {day.num}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.indicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // Fixed: Changed 'between' to 'space-between' which is the valid value for React Native Flexbox.
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  title: {
    color: '#0f766e',
    fontWeight: '700',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayItem: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  dayCircle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dayCircleSelected: {
    backgroundColor: '#0f766e',
  },
  dayNum: {
    fontSize: 16,
    color: '#1e293b',
  },
  dayNumSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 12,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: '#f1f5f9',
    borderRadius: 2,
  }
});

export default CalendarStrip;
