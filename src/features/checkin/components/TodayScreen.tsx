import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AuraOrb } from '@/features/aura/components/AuraOrb';
import { t } from '@/shared/i18n';
import { toDay } from '@/shared/lib/date';
import { colors, radius, spacing, typography } from '@/shared/theme/tokens';
import { Button } from '@/shared/ui/Button';
import { Screen } from '@/shared/ui/Screen';
import { useCheckInForDay, useSaveCheckIn } from '../hooks/useCheckIns';
import { useDraftStore } from '../store/useDraftStore';
import { EnergySlider } from './EnergySlider';
import { ValencePicker } from './ValencePicker';

const ORB_SIZE = 260;

export function TodayScreen() {
  const day = toDay();
  const { data: existing } = useCheckInForDay(day);
  const save = useSaveCheckIn();
  const { valence, energy, note, setValence, setEnergy, setNote, hydrate } = useDraftStore();

  useEffect(() => {
    if (existing) hydrate(existing);
  }, [existing, hydrate]);

  const onSave = () => {
    save.mutate(
      { day, valence, energy, note: note.trim() },
      { onSuccess: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) },
    );
  };

  return (
    <Screen title={t('today.title')}>
      <View style={styles.orbWrap}>
        <AuraOrb valence={valence} energy={energy} size={ORB_SIZE} />
      </View>

      <ValencePicker value={valence} onChange={setValence} />

      <View style={styles.block}>
        <Text style={styles.label}>{t('today.energy')}</Text>
        <EnergySlider value={energy} onChange={setEnergy} />
      </View>

      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder={t('today.notePlaceholder')}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        multiline
      />

      <Button
        label={existing ? t('today.update') : t('today.save')}
        onPress={onSave}
        loading={save.isPending}
      />
      {save.isSuccess ? <Text style={styles.success}>{t('today.saved')}</Text> : null}
      {save.isError ? <Text style={styles.error}>{t('error.generic')}</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  orbWrap: { alignItems: 'center' },
  block: { gap: spacing.sm },
  label: { ...typography.caption, color: colors.textMuted, textTransform: 'uppercase' },
  input: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 72,
    textAlignVertical: 'top',
  },
  success: { ...typography.caption, color: colors.success, textAlign: 'center' },
  error: { ...typography.caption, color: colors.danger, textAlign: 'center' },
});
