import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, Send, Paperclip, Lock } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';

// Sample conversation data
const conversationsData = {
  '1': {
    doctor: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      avatar: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    messages: [
      {
        id: '1',
        sender: 'doctor',
        text: 'Your latest ECG results look normal. Continue with the prescribed medication.',
        timestamp: '10:30 AM',
      },
      {
        id: '2',
        sender: 'user',
        text: 'Hello! How can I help you today?',
        timestamp: '09:15 AM',
      },
      {
        id: '3',
        sender: 'user',
        text: 'Hi Dr. Johnson, I have a question about my medication schedule.',
        timestamp: '09:20 AM',
      },
      {
        id: '4',
        sender: 'doctor',
        text: 'Of course! Please take the beta blocker in the morning and the ACE inhibitor in the evening with meals.',
        timestamp: '09:22 AM',
      },
      {
        id: '5',
        sender: 'user',
        text: 'Thank you for clarifying. Should I continue this schedule for the next month?',
        timestamp: '09:25 AM',
      },
      {
        id: '6',
        sender: 'doctor',
        text: 'Yes, please continue this schedule until our next appointment. Monitor your blood pressure daily and let me know if you experience any side effects.',
        timestamp: '09:30 AM',
      },
    ],
  },
  '2': {
    doctor: {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Radiologist',
      avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    messages: [
      {
        id: '1',
        sender: 'doctor',
        text: 'Please remember to fast 8 hours before your sonography tomorrow.',
        timestamp: 'Yesterday',
      },
      {
        id: '2',
        sender: 'user',
        text: 'Thank you for the reminder. Should I still take my regular medications?',
        timestamp: 'Yesterday',
      },
      {
        id: '3',
        sender: 'doctor',
        text: 'Yes, you can take your regular medications with a small sip of water. But no food or other fluids.',
        timestamp: 'Yesterday',
      },
    ],
  },
};

type Message = {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  timestamp: string;
};

const MessageItem = ({ message, doctorAvatar }: { message: Message; doctorAvatar: string }) => {
  const isUser = message.sender === 'user';
  
  return (
    <View style={[styles.messageRow, isUser ? styles.userMessageRow : {}]}>
      {!isUser && (
        <Image source={{ uri: doctorAvatar }} style={styles.messageAvatar} />
      )}
      <View style={[styles.messageBubble, isUser ? styles.userMessageBubble : {}]}>
        <Text style={[styles.messageText, isUser ? styles.userMessageText : {}]}>
          {message.text}
        </Text>
        <Text style={styles.messageTime}>{message.timestamp}</Text>
      </View>
    </View>
  );
};

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const conversation = conversationsData[id as string];
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  if (!conversation) {
    return (
      <View style={styles.container}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  const scrollToBottom = () => {
    if (flatListRef.current && conversation.messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    // Scroll to bottom when component mounts
    setTimeout(scrollToBottom, 200);
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // In a real app, this would send the message to an API
    // For now, we'll just clear the input
    setMessage('');
    
    // Scroll to bottom after sending
    setTimeout(scrollToBottom, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          
          <Image source={{ uri: conversation.doctor.avatar }} style={styles.doctorAvatar} />
          
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{conversation.doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{conversation.doctor.specialty}</Text>
          </View>
          
          <TouchableOpacity style={styles.searchButton}>
            <Lock size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.secureNotice}>
          <Lock size={16} color={COLORS.textSecondary} />
          <Text style={styles.secureText}>Secure Medical Messaging</Text>
        </View>
        
        <FlatList
          ref={flatListRef}
          data={conversation.messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageItem 
              message={item} 
              doctorAvatar={conversation.doctor.avatar} 
            />
          )}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={scrollToBottom}
        />
        
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, message.trim() === '' ? styles.sendButtonDisabled : {}]}
            onPress={handleSendMessage}
            disabled={message.trim() === ''}
          >
            <Send size={20} color={message.trim() === '' ? COLORS.textTertiary : '#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  backButton: {
    marginRight: SPACING.sm,
  },
  doctorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.textPrimary,
  },
  doctorSpecialty: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  secureText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  messagesContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    alignItems: 'flex-end',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessageBubble: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: COLORS.textTertiary,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  attachButton: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontFamily: 'Inter_400Regular',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.inputBackground,
  },
});