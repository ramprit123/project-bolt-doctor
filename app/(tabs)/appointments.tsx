import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';

// Sample data for upcoming and past appointments
const upcomingAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Radiologist - Sonography',
    appointmentType: 'Abdominal Sonography',
    date: 'Tuesday, March 12, 2024',
    time: '10:30 AM',
    duration: '45 minutes',
    location: 'Metro Medical Center',
    status: 'Confirmed',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    appointmentType: 'Heart Checkup',
    date: 'Friday, March 15, 2024',
    time: '2:15 PM',
    duration: '30 minutes',
    location: 'Heart Care Clinic',
    status: 'Pending',
  },
];

const pastAppointments = [
  {
    id: '3',
    doctorName: 'Dr. Emily Wilson',
    specialty: 'Neurologist',
    appointmentType: 'Neurological Assessment',
    date: 'February 28, 2024',
    time: '11:00 AM',
    duration: '60 minutes',
    location: 'Neuroscience Center',
    status: 'Completed',
  },
  {
    id: '4',
    doctorName: 'Dr. James Rodriguez',
    specialty: 'General Physician',
    appointmentType: 'Regular Checkup',
    date: 'February 15, 2024',
    time: '9:30 AM',
    duration: '30 minutes',
    location: 'Community Clinic',
    status: 'Cancelled',
  },
];

type AppointmentType = {
  id: string;
  doctorName: string;
  specialty: string;
  appointmentType: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: string;
};

const AppointmentCard = ({ appointment, onPress }: { appointment: AppointmentType; onPress: () => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return COLORS.success;
      case 'Pending':
        return COLORS.warning;
      case 'Completed':
        return COLORS.info;
      case 'Cancelled':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <TouchableOpacity style={styles.appointmentCard} onPress={onPress}>
      <View style={styles.appointmentHeader}>
        <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
          {appointment.status}
        </Text>
      </View>
      
      <Text style={styles.doctorName}>{appointment.doctorName}</Text>
      <Text style={styles.specialty}>{appointment.specialty}</Text>
      
      <View style={styles.appointmentDetail}>
        <Calendar size={16} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{appointment.date}</Text>
      </View>
      
      <View style={styles.appointmentDetail}>
        <Clock size={16} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{appointment.time} • {appointment.duration}</Text>
      </View>
      
      <View style={styles.appointmentDetail}>
        <MapPin size={16} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{appointment.location}</Text>
      </View>
      
      <View style={styles.appointmentFooter}>
        <Text style={styles.appointmentType}>{appointment.appointmentType}</Text>
        <ChevronRight size={20} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
};

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const handleAppointmentPress = (id: string) => {
    router.push(`/appointment/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Appointments</Text>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'upcoming' ? upcomingAppointments : pastAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onPress={() => handleAppointmentPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  tab: {
    paddingVertical: 14,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  listContent: {
    padding: SPACING.lg,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  doctorName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  appointmentType: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: COLORS.primary,
  },
});