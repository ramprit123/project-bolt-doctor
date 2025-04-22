import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { router } from 'expo-router';
import {
  Bell,
  ChevronRight,
  File,
  Globe,
  CircleHelp as HelpCircle,
  Lock,
  Mail,
  Shield,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileSection = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const ProfileItem = ({
  label,
  value,
  onPress,
  icon,
  index,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  index: number;
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={animatedStyle}
    >
      <TouchableOpacity
        style={styles.profileItem}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {icon && <View style={styles.profileItemIcon}>{icon}</View>}
        <View style={styles.profileItemContent}>
          <Text style={styles.profileItemLabel}>{label}</Text>
          {value && <Text style={styles.profileItemValue}>{value}</Text>}
        </View>
        <ChevronRight size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </Animated.View>
  );
};

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Animated.View
          style={styles.header}
          entering={FadeInDown.duration(800)}
        >
          <View style={styles.profileImageContainer}>
            <Animated.Image
              source={{
                uri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
              }}
              style={[styles.profileImage]}
              entering={FadeInDown.duration(1000).springify()}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Text style={styles.cameraButtonText}>📷</Text>
            </TouchableOpacity>
          </View>
          <Animated.Text
            style={styles.profileName}
            entering={FadeInUp.duration(800).delay(200)}
          >
            {userInfo.name}
          </Animated.Text>
          <Animated.Text
            style={styles.profileEmail}
            entering={FadeInUp.duration(800).delay(400)}
          >
            {userInfo.email}
          </Animated.Text>
          <Animated.View entering={FadeInUp.duration(800).delay(600)}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)}>
          <ProfileSection title="Personal Information">
            <ProfileItem
              label="Full Name"
              value={userInfo.name}
              onPress={() => {}}
              index={0}
            />
            <ProfileItem
              label="Phone"
              value={userInfo.phone}
              onPress={() => {}}
              index={1}
            />
            <ProfileItem
              label="Date of Birth"
              value={userInfo.dob}
              onPress={() => {}}
              index={2}
            />
            <ProfileItem
              label="Gender"
              value={userInfo.gender}
              onPress={() => {}}
              index={3}
            />
          </ProfileSection>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400)}>
          <ProfileSection title="Account Settings">
            <ProfileItem
              label="Change Password"
              onPress={() => {}}
              icon={<Lock size={20} color={COLORS.primary} />}
              index={4}
            />
            <ProfileItem
              label="Notification Preferences"
              onPress={() => {}}
              icon={<Bell size={20} color={COLORS.primary} />}
              index={5}
            />
            <ProfileItem
              label="Language Settings"
              onPress={() => {}}
              icon={<Globe size={20} color={COLORS.primary} />}
              index={6}
            />
          </ProfileSection>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600)}>
          <ProfileSection title="Support & Legal">
            <ProfileItem
              label="Help Center"
              onPress={() => {}}
              icon={<HelpCircle size={20} color={COLORS.primary} />}
              index={7}
            />
            <ProfileItem
              label="Contact Us"
              onPress={() => {}}
              icon={<Mail size={20} color={COLORS.primary} />}
              index={8}
            />
            <ProfileItem
              label="Terms of Service"
              onPress={() => {}}
              icon={<File size={20} color={COLORS.primary} />}
              index={9}
            />
            <ProfileItem
              label="Privacy Policy"
              onPress={() => {}}
              icon={<Shield size={20} color={COLORS.primary} />}
              index={10}
            />
          </ProfileSection>
        </Animated.View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  header: {
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.sm,
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
