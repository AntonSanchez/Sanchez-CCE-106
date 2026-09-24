import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from './sharedStyles';

export interface NotificationData {
  type: 'success' | 'error';
  message: string;
}

interface NotificationBannerProps {
  notification: NotificationData | null;
  onDismiss: () => void;
}

const AUTO_DISMISS_MS = 3000;

export default function NotificationBanner({
  notification,
  onDismiss,
}: NotificationBannerProps) {
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!notification) return;

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 60,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(hide, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const hide = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  };

  if (!notification) return null;

  const isSuccess = notification.type === 'success';

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.wrapper, { opacity, transform: [{ translateY }] }]}
    >
      <Pressable
        onPress={hide}
        style={[
          styles.banner,
          {
            backgroundColor: isSuccess ? Colors.successBg : Colors.errorBg,
            borderColor: isSuccess ? Colors.success : Colors.error,
          },
        ]}
      >
        <Text style={[styles.icon, { color: isSuccess ? Colors.success : Colors.error }]}>
          {isSuccess ? '✓' : '⚠'}
        </Text>
        <Text style={[styles.text, { color: isSuccess ? Colors.success : Colors.error }]}>
          {notification.message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 100,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  icon: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
  },
});
