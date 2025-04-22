import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, MapPin } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';

type AppointmentCardProps = {
  appointment: {
    id: number;
    doctorName: string;
    appointmentType: string;
    date: string;
    location: string;
  };
  onPress?: () => void;
};

const AppointmentCard = ({ appointment, onPress }: AppointmentCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftAccent} />
      <View style={styles.content}>
        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
        <Text style={styles.appointmentType}>{appointment.appointmentType}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Clock size={14} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{appointment.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={14} color={COLORS.textSecondary} />
            <Text style={styles.detailText}>{appointment.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  leftAccent: {
    width: 4,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  appointmentType: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.primary,
    marginBottom: 8,
  },
  detailsContainer: {
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
});

export default AppointmentCard;