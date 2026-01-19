import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CalendarProps {
  month: string;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({ month, selectedDay, onSelectDay }) => {
  const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  const days = [
    { day: 1, markers: 0 }, { day: 2, markers: 1 }, { day: 3, markers: 0 },
    { day: 4, markers: 1 }, { day: 5, markers: 1 }, { day: 6, markers: 0 },
    { day: 7, markers: 1 }, { day: 8, markers: 0 }, { day: 9, markers: 2 },
    { day: 10, markers: 0 }, { day: 11, markers: 0 }, { day: 12, markers: 0 },
    { day: 13, markers: 0 }, { day: 14, markers: 0 },
  ];

  const emptyPrefix = [null, null, null];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="chevron-left" size={24} color="#cbd5e1" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{month}</Text>
        <TouchableOpacity>
          <FontAwesome name="chevron-right" size={24} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {weekdays.map((wd, i) => (
          <View key={i} style={styles.gridCell}>
            <Text style={styles.weekdayText}>{wd}</Text>
          </View>
        ))}
        
        {emptyPrefix.map((_, i) => (
          <View key={`empty-${i}`} style={styles.gridCell} />
        ))}

        {days.map((d) => {
          const isSelected = selectedDay === d.day;
          return (
            <TouchableOpacity
              key={d.day}
              onPress={() => onSelectDay(d.day)}
              style={[styles.gridCell, styles.dayButton, isSelected && styles.selectedDayButton]}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
                {d.day}
              </Text>
              {!isSelected && d.markers > 0 && (
                <View style={styles.markerContainer}>
                  {[...Array(d.markers)].map((_, i) => (
                    <View key={i} style={styles.marker} />
                  ))}
                </View>
              )}
              {isSelected && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  navIcon: {
    fontFamily: 'Material Symbols Outlined',
    color: '#cbd5e1',
    fontSize: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: `${100 / 7}%`,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#cbd5e1',
    letterSpacing: 1,
    marginBottom: 8,
  },
  dayButton: {
    borderRadius: 20,
    position: 'relative',
  },
  selectedDayButton: {
    backgroundColor: '#008f81',
    shadowColor: '#008f81',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  selectedDayText: {
    color: '#ffffff',
  },
  markerContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  marker: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#008f81',
    opacity: 0.4,
    marginHorizontal: 1,
  },
  activeDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
});

export default Calendar;
