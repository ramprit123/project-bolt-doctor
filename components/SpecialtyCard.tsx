import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';

type SpecialtyCardProps = {
  specialty: {
    id: number;
    name: string;
    icon: string;
  };
  onPress?: () => void;
};

const SpecialtyCard = ({ specialty, onPress }: SpecialtyCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {specialty.icon === 'waveform' && '🔊'}
          {specialty.icon === 'heart' && '❤️'}
          {specialty.icon === 'baby' && '👶'}
          {specialty.icon === 'stethoscope' && '👨‍⚕️'}
        </Text>
      </View>
      <Text style={styles.name}>{specialty.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: SPACING.md,
    padding: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
  },
  name: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});

export default SpecialtyCard;