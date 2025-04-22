import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import { SPACING } from '@/constants/Spacing';
import CustomButton from '@/components/ui/CustomButton';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // In a real app, you would authenticate against a backend
    if (email && password) {
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>+</Text>
          </View>
        </View>
        
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        
        <View style={styles.form}>
          <Text style={styles.label}>Email or Phone</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email or phone"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color={COLORS.textSecondary} />
              ) : (
                <Eye size={20} color={COLORS.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <CustomButton 
            title="Sign In" 
            onPress={handleSignIn} 
            style={styles.signInButton}
          />
          
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.line} />
          </View>
          
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: 'Inter_400Regular',
  },
  eyeIcon: {
    padding: SPACING.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
  },
  signInButton: {
    marginBottom: SPACING.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    paddingHorizontal: SPACING.sm,
    color: COLORS.textSecondary,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  socialButtonText: {
    fontFamily: 'Inter_500Medium',
    color: COLORS.textPrimary,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  signUpText: {
    fontFamily: 'Inter_400Regular',
    color: COLORS.textSecondary,
  },
  signUpLink: {
    fontFamily: 'Inter_600SemiBold',
    color: COLORS.primary,
    marginLeft: 4,
  },
});