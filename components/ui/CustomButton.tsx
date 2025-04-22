import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants/Colors';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
};

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
}: CustomButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButtonText;
      case 'outline':
        return styles.outlineButtonText;
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled || loading ? styles.disabledButton : {},
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : '#FFFFFF'}
          size="small"
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.primaryLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  outlineButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default CustomButton;