import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import { router } from 'expo-router';
import { ChevronLeft, Lock, Search } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data for conversations
const conversations = [
  {
    id: '1',
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      avatar:
        'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    lastMessage:
      'Your latest ECG results look normal. Continue with the prescribed medication.',
    timestamp: '10:30 AM',
    unread: false,
  },
  {
    id: '2',
    doctor: {
      name: 'Dr. Michael Chen',
      specialty: 'Radiologist',
      avatar:
        'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    lastMessage:
      'Please remember to fast 8 hours before your sonography tomorrow.',
    timestamp: 'Yesterday',
    unread: true,
  },
  {
    id: '3',
    doctor: {
      name: 'Dr. Emily Wilson',
      specialty: 'Neurologist',
      avatar:
        'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    lastMessage:
      'Based on your symptoms, we should schedule a follow-up appointment.',
    timestamp: 'Yesterday',
    unread: true,
  },
];

const ConversationItem = ({
  conversation,
  onPress,
}: {
  conversation: any;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.conversationItem} onPress={onPress}>
      <Image
        source={{ uri: conversation.doctor.avatar }}
        style={styles.avatar}
      />
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.doctorName}>{conversation.doctor.name}</Text>
          <Text style={styles.timestamp}>{conversation.timestamp}</Text>
        </View>
        <Text style={styles.specialty}>{conversation.doctor.specialty}</Text>
        <Text
          style={[
            styles.lastMessage,
            conversation.unread && styles.unreadMessage,
          ]}
          numberOfLines={2}
        >
          {conversation.lastMessage}
        </Text>
      </View>
      {conversation.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleConversationPress = (id: string) => {
    router.push(`/messages/${id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity>
              <ChevronLeft size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Messages</Text>
            <TouchableOpacity>
              <Search size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.secureNotice}>
          <Lock size={16} color={COLORS.textSecondary} />
          <Text style={styles.secureText}>Secure Medical Messaging</Text>
        </View>

        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConversationItem
              conversation={item}
              onPress={() => handleConversationPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
  },
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  secureText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    margin: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: SPACING.sm,
    fontFamily: 'Inter_400Regular',
  },
  listContent: {
    paddingVertical: SPACING.md,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: SPACING.md,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  unreadMessage: {
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
  },
  unreadDot: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});
