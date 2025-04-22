import AppointmentCard from '@/components/AppointmentCard';
import DoctorCard from '@/components/DoctorCard';
import SpecialtyCard from '@/components/SpecialtyCard';
import CustomButton from '@/components/ui/CustomButton';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { Search } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  FadeIn,
  FadeInDown,
  FadeInRight,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const specialties = [
  { id: 1, name: 'Sonography', icon: 'waveform' },
  { id: 2, name: 'Cardiology', icon: 'heart' },
  { id: 3, name: 'Pediatrics', icon: 'baby' },
  { id: 4, name: 'General Medicine', icon: 'stethoscope' },
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Wilson',
    specialty: 'Sonographer',
    rating: 4.9,
    availability: 'Today',
    image:
      'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: 2,
    name: 'Dr. John Smith',
    specialty: 'Radiologist',
    rating: 4.8,
    availability: 'Tomorrow',
    image:
      'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const appointments = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Wilson',
    appointmentType: 'Sonography',
    date: 'Today, 2:00 PM',
    location: 'Medical Center',
  },
  {
    id: 2,
    doctorName: 'Dr. John Smith',
    appointmentType: 'Radiology',
    date: 'Tomorrow, 10:30 AM',
    location: 'City Hospital',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const headerOpacity = useSharedValue(0);
  const searchScale = useSharedValue(0.8);
  const avatarScale = useSharedValue(0.8);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 1000 });
    searchScale.value = withSpring(1);
    avatarScale.value = withSpring(1);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <View>
            <Text style={styles.title}>Find Your Doctor</Text>
            <Text style={styles.subtitle}>Book appointments easily</Text>
          </View>
          <Animated.View style={[styles.avatar, avatarAnimatedStyle]}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
              }}
              style={styles.avatarImage}
            />
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={[styles.searchContainer, searchAnimatedStyle]}
          entering={FadeInDown.delay(200).springify()}
        >
          <Search
            size={20}
            color={COLORS.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>

        <Animated.View
          style={styles.bookSonography}
          entering={FadeInRight.delay(400).springify()}
        >
          <View style={styles.bookSonographyIcon}>
            <Text style={styles.bookSonographyIconText}>🔊</Text>
          </View>
          <View style={styles.bookSonographyContent}>
            <Text style={styles.bookSonographyTitle}>Book Sonography</Text>
            <Text style={styles.bookSonographySubtitle}>
              Quick appointment for ultrasound services
            </Text>
          </View>
          <CustomButton
            title="Book Now"
            onPress={() => {}}
            style={styles.bookNowButton}
          />
        </Animated.View>

        <Text style={styles.sectionTitle}>Popular Specialties</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialtiesScroll}
        >
          {specialties.map((specialty) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available Doctors</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.doctorsScroll}
        >
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: SPACING.md,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textPrimary,
  },
  bookSonography: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  bookSonographyIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  bookSonographyIconText: {
    fontSize: 24,
  },
  bookSonographyContent: {
    flex: 1,
  },
  bookSonographyTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  bookSonographySubtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  bookNowButton: {
    width: 120,
    height: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  specialtiesScroll: {
    marginBottom: SPACING.xl,
  },
  doctorsScroll: {
    marginBottom: SPACING.xl,
  },
});
