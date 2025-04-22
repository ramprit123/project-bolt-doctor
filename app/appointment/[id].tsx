import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Clock, MapPin, CalendarCheck, CircleCheck as CheckCircle, Share2 } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import CustomButton from '@/components/ui/CustomButton';

// Sample appointment data - in a real app this would come from an API
const appointmentData = {
  '1': {
    id: '1',
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Radiologist - Sonography',
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    facility: 'Metro Medical Center',
    address: '123 Healthcare Ave, New York, NY 10001',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    appointmentType: 'Abdominal Sonography',
    patientId: '#PAT20240312',
    date: 'Tuesday, March 12, 2024',
    time: '10:30 AM',
    duration: '45 minutes',
    status: 'Confirmed',
    preparations: [
      'Fast for 8 hours before the appointment',
      'Drink 4-6 glasses of water 1 hour before',
      'Do not urinate before the procedure',
      'Bring previous medical records',
    ],
  },
  '2': {
    id: '2',
    doctor: {
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    facility: 'Heart Care Clinic',
    address: '456 Medical Blvd, New York, NY 10002',
    location: {
      latitude: 40.7308,
      longitude: -73.9973,
    },
    appointmentType: 'Heart Checkup',
    patientId: '#PAT20240315',
    date: 'Friday, March 15, 2024',
    time: '2:15 PM',
    duration: '30 minutes',
    status: 'Pending',
    preparations: [
      'No caffeine 12 hours before the appointment',
      'Take your regular medications',
      'Wear comfortable clothing',
      'Bring your medication list',
    ],
  },
};

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const appointment = appointmentData[id as string];

  if (!appointment) {
    return (
      <View style={styles.container}>
        <Text>Appointment not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color="#6E2FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Appointment Details</Text>
          <TouchableOpacity>
            <Share2 size={24} color="#6E2FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusDot}>
            <CheckCircle size={16} color={COLORS.success} />
          </View>
          <Text style={styles.statusText}>{appointment.status}</Text>
        </View>

        <Text style={styles.dateText}>{appointment.date}</Text>
        <View style={styles.timeRow}>
          <Clock size={16} color={COLORS.textSecondary} />
          <Text style={styles.timeText}>{appointment.time}</Text>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.durationText}>{appointment.duration}</Text>
        </View>
      </View>

      <View style={styles.doctorCard}>
        <Image source={{ uri: appointment.doctor.avatar }} style={styles.doctorImage} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{appointment.doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{appointment.doctor.specialty}</Text>
          <Text style={styles.facilityName}>{appointment.facility}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{appointment.doctor.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text style={styles.detailValue}>Michael Anderson</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Patient ID:</Text>
          <Text style={styles.detailValue}>{appointment.patientId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Appointment Type:</Text>
          <Text style={styles.detailValue}>{appointment.appointmentType}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.preparationHeader}>
          <Text style={styles.sectionTitle}>Preparation Instructions</Text>
        </View>
        {appointment.preparations.map((preparation, index) => (
          <View key={index} style={styles.preparationItem}>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
            </View>
            <Text style={styles.preparationText}>{preparation}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.facilityAddress}>{appointment.facility}</Text>
        <Text style={styles.address}>{appointment.address}</Text>
        
        <View style={styles.locationCard}>
          <MapPin size={24} color={COLORS.primary} />
          <Text style={styles.locationText}>{appointment.address}</Text>
        </View>
        
        <CustomButton
          title="Get Directions"
          onPress={() => {}}
          icon={<MapPin size={18} color="#FFFFFF" />}
          style={styles.directionsButton}
        />
      </View>

      <View style={styles.actionButtons}>
        <CustomButton
          title="Add to Calendar"
          onPress={() => {}}
          icon={<CalendarCheck size={18} color="#FFFFFF" />}
          style={styles.calendarButton}
        />
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Clinic</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cancelSection}>
        <TouchableOpacity style={styles.rescheduleButton}>
          <Text style={styles.rescheduleButtonText}>Reschedule Appointment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
  },
  statusCard: {
    margin: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    marginRight: 6,
  },
  statusText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: COLORS.success,
  },
  dateText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  bulletPoint: {
    marginHorizontal: 6,
    color: COLORS.textSecondary,
  },
  durationText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  doctorCard: {
    margin: SPACING.lg,
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  doctorImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: SPACING.md,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  facilityName: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.primary,
  },
  section: {
    margin: SPACING.lg,
    marginTop: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 120,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
    flex: 1,
  },
  preparationHeader: {
    marginBottom: SPACING.sm,
  },
  preparationItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 20,
    color: COLORS.primary,
    marginRight: 8,
  },
  preparationText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  facilityAddress: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  locationText: {
    marginLeft: SPACING.sm,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textPrimary,
    flex: 1,
  },
  directionsButton: {
    marginTop: SPACING.sm,
  },
  actionButtons: {
    margin: SPACING.lg,
    marginTop: 0,
    marginBottom: SPACING.md,
  },
  calendarButton: {
    marginBottom: SPACING.md,
  },
  contactButton: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonText: {
    color: COLORS.primary,
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  cancelSection: {
    margin: SPACING.lg,
    marginTop: 0,
    marginBottom: 40,
  },
  rescheduleButton: {
    height: 48,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  rescheduleButtonText: {
    color: COLORS.primary,
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  cancelButton: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.error,
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
});