import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { t } from '@/shared/i18n';
import { colors, radius, spacing, typography } from '@/shared/theme/tokens';
import { Button } from '@/shared/ui/Button';
import { Screen } from '@/shared/ui/Screen';
import { useApiKey, useSaveApiKey } from '../hooks/useApiKey';

export function SettingsScreen() {
  const { data: storedKey } = useApiKey();
  const save = useSaveApiKey();
  const [draft, setDraft] = useState<string | null>(null);
  const value = draft ?? storedKey ?? '';

  return (
    <Screen title={t('settings.title')}>
      <Text style={styles.label}>{t('settings.apiKey')}</Text>
      <TextInput
        value={value}
        onChangeText={setDraft}
        placeholder="sk-ant-…"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text style={styles.hint}>{t('settings.apiKeyHint')}</Text>
      <Button label={t('settings.save')} onPress={() => save.mutate(value.trim())} loading={save.isPending} />
      {save.isSuccess ? <Text style={styles.success}>{t('settings.saved')}</Text> : null}
      {save.isError ? <Text style={styles.error}>{t('error.generic')}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { ...typography.caption, color: colors.textMuted, textTransform: 'uppercase' },
  input: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  hint: { ...typography.caption, color: colors.textMuted },
  success: { ...typography.caption, color: colors.success },
  error: { ...typography.caption, color: colors.danger },
});
