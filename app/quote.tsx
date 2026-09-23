import { Fraunces_600SemiBold, useFonts } from '@expo-google-fonts/fraunces';
import {
  Manrope_400Regular,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// api.quotable.io has a long history of extended outages, so this uses
// DummyJSON's quotes endpoint instead — stable, free, no auth required.
const QUOTE_API_URL = 'https://dummyjson.com/quotes/random';

const COLORS = {
  navy: '#0d2f66',
  navyDeep: '#082049',
  blue: '#37b6ff',
  gold: '#f2cf6e',
  bg: '#eef1f6',
  ink: '#1b2430',
  error: '#ff8a8a',
};

export default function QuoteScreen() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Note: this project's root layout (app/_layout.tsx) doesn't manage a splash
  // screen, so — unlike the original standalone App.js — this screen does NOT
  // call SplashScreen.preventAutoHideAsync()/hideAsync(). Doing that from a
  // nested screen instead of the root layout doesn't reliably hold the splash
  // screen anyway; it just shows its own small loading state below instead.
  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    Manrope_400Regular,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(QUOTE_API_URL, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (err) {
      setError('Could not fetch a quote. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centerAll]}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <View style={styles.intro}>
        <Text style={styles.eyebrow}>BEGINNER PROJECT</Text>
        <Text style={styles.heading}>Quote of the Day</Text>
      </View>

      <View style={styles.container}>
        <LinearGradient
          colors={[COLORS.navy, COLORS.navyDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <Text style={styles.label}>QUOTE OF THE DAY</Text>

          <View style={styles.content}>
            {loading && (
              <ActivityIndicator size="large" color={COLORS.blue} />
            )}

            {!loading && error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {!loading && !error && (
              <>
                <Text style={styles.quoteText}>“{quote}”</Text>
                <Text style={styles.authorText}>— {author}</Text>
              </>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={fetchQuote}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>
              {loading ? 'LOADING...' : 'NEW QUOTE'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  centerAll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  intro: {
    paddingTop: 24,
    paddingHorizontal: 28,
  },
  eyebrow: {
    color: COLORS.blue,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 12,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  heading: {
    color: COLORS.ink,
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 26,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 22,
    paddingVertical: 30,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.35,
    shadowRadius: 30,
    elevation: 10,
  },
  label: {
    color: COLORS.blue,
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 12,
    letterSpacing: 1.4,
    marginBottom: 26,
  },
  content: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
    gap: 14,
  },
  quoteText: {
    color: '#ffffff',
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
  },
  authorText: {
    color: COLORS.gold,
    fontFamily: 'Manrope_700Bold',
    fontSize: 15,
  },
  errorText: {
    color: COLORS.error,
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  button: {
    backgroundColor: COLORS.blue,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: COLORS.blue,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 13,
    letterSpacing: 0.6,
  },
});
