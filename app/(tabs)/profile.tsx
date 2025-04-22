import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ChevronRight, Lock, Bell, Globe, CircleHelp as HelpCircle, Mail, File, Shield } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { router } from 'expo-router';

const ProfileSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const ProfileItem = ({ 
  label, 
  value, 
  onPress, 
  icon 
}: { 
  label: string; 
  value?: string; 
  onPress?: () => void;
  icon?: React.ReactNode;
}) => (
  <TouchableOpacity style={styles.profileItem} onPress={onPress}>
    {icon && <View style={styles.profileItemIcon}>{icon}</View>}
    <View style={styles.profileItemContent}>
      <Text style={styles.profileItemLabel}>{label}</Text>
      {value && <Text style={styles.profileItemValue}>{value}</Text>}
    </View>
    <ChevronRight size={20} color={COLORS.textSecondary} />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const userInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    dob: '15 May 1985',
    gender: 'Female',
  };

  const handleEditProfile = () => {
    // In a real app, navigate to edit profile screen
  };

  const handleLogout = () => {
    router.replace('/(auth)/sign-in');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Text style={styles.cameraButtonText}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>{userInfo.name}</Text>
        <Text style={styles.profileEmail}>{userInfo.email}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ProfileSection title="Personal Information">
        <ProfileItem label="Full Name" value={userInfo.name} onPress={() => {}} />
        <ProfileItem label="Phone" value={userInfo.phone} onPress={() => {}} />
        <ProfileItem label="Date of Birth" value={userInfo.dob} onPress={() => {}} />
        <ProfileItem label="Gender" value={userInfo.gender} onPress={() => {}} />
      </ProfileSection>

      <ProfileSection title="Account Settings">
        <ProfileItem 
          label="Change Password" 
          onPress={() => {}} 
          icon={<Lock size={20} color={COLORS.primary} />} 
        />
        <ProfileItem 
          label="Notification Preferences" 
          onPress={() => {}} 
          icon={<Bell size={20} color={COLORS.primary} />} 
        />
        <ProfileItem 
          label="Language Settings" 
          onPress={() => {}} 
          icon={<Globe size={20} color={COLORS.primary} />} 
        />
      </ProfileSection>

      <ProfileSection title="Support & Legal">
        <ProfileItem 
          label="Help Center" 
          onPress={() => {}} 
          icon={<HelpCircle size={20} color={COLORS.primary} />} 
        />
        <ProfileItem 
          label="Contact Us" 
          onPress={() => {}} 
          icon={<Mail size={20} color={COLORS.primary} />} 
        />
        <ProfileItem 
          label="Terms of Service" 
          onPress={() => {}} 
          icon={<File size={20} color={COLORS.primary} />} 
        />
        <ProfileItem 
          label="Privacy Policy" 
          onPress={() => {}} 
          icon={<Shield size={20} color={COLORS.primary} />} 
        />
      </ProfileSection>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  header: {
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cameraButtonText: {
    fontSize: 16,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F5',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  profileItemIcon: {
    marginRight: SPACING.sm,
  },
  profileItemContent: {
    flex: 1,
  },
  profileItemLabel: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
  },
  profileItemValue: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    margin: SPACING.lg,
    marginTop: SPACING.xl,
    padding: SPACING.md,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.error,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.error,
  },
});