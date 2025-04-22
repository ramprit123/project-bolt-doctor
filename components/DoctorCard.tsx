import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';

type DoctorCardProps = {
  doctor: {
    id: number;
    name: string;
    specialty: string;
    rating: number;
    availability: string;
    image: string;
  };
  onPress?: () => void;
};

const DoctorCard = ({ doctor, onPress }: DoctorCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.rating}>{doctor.rating}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.availability}>{doctor.availability}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: SPACING.sm,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  specialty: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.sm,
  },
  availability: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.primary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  bookButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#FFFFFF',
  },
});

export default DoctorCard;