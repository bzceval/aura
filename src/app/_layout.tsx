import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { bootstrapDatabase } from '@/shared/db/client';
import { t } from '@/shared/i18n';
import { colors } from '@/shared/theme';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [bootError, setBootError] = useState<string | null>(null);

  useEffect(() => {
    bootstrapDatabase()
      .then(() => setReady(true))
      .catch((error: unknown) => {
        console.error('Database bootstrap failed', error);
        setBootError(t('error.generic'));
      })
      .finally(() => SplashScreen.hideAsync());
  }, []);

  if (bootError) return <Text style={styles.error}>{bootError}</Text>;
  if (!ready) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  error: { flex: 1, backgroundColor: colors.bg, color: colors.danger, padding: 48, textAlign: 'center' },
});
