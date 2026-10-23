import { StyleSheet, Text, View } from 'react-native';
import { t } from '@/shared/i18n';
import { colors, radius, spacing, typography } from '@/shared/theme/tokens';
import { Button } from '@/shared/ui/Button';
import { Screen } from '@/shared/ui/Screen';
import { useReflection } from '../hooks/useReflection';
import { ReflectionSource } from '../types';

export function InsightsScreen() {
  const reflection = useReflection();
  const result = reflection.data;

  return (
    <Screen title={t('insights.title')}>
      <Button
        label={t('insights.generate')}
        onPress={() => reflection.mutate()}
        loading={reflection.isPending}
      />

      {reflection.isSuccess && result === null ? (
        <Text style={styles.muted}>{t('insights.needData')}</Text>
      ) : null}

      {result ? (
        <View style={styles.card}>
          <Text style={styles.text}>{result.text}</Text>
          {result.source === ReflectionSource.Local ? (
            <Text style={styles.muted}>{t('insights.local')}</Text>
          ) : null}
        </View>
      ) : null}

      {reflection.isError ? <Text style={styles.error}>{t('error.generic')}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: { ...typography.body, color: colors.text },
  muted: { ...typography.caption, color: colors.textMuted },
  error: { ...typography.caption, color: colors.danger },
});
