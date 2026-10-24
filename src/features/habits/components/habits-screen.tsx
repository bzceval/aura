import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { t } from '@/shared/i18n';
import { colors, radius, spacing, typography } from '@/shared/theme';
import { Screen } from '@/shared/ui/screen';
import { useCreateHabit, useHabits, useRemoveHabit, useToggleHabit } from '../hooks/use-habits';

export function HabitsScreen() {
  const { data: habits = [] } = useHabits();
  const create = useCreateHabit();
  const remove = useRemoveHabit();
  const toggle = useToggleHabit();
  const [title, setTitle] = useState('');

  const submit = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    create.mutate(trimmed, { onSuccess: () => setTitle('') });
  };

  return (
    <Screen title={t('habits.title')}>
      <View style={styles.addRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={submit}
          placeholder={t('habits.placeholder')}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          returnKeyType="done"
        />
        <Pressable onPress={submit} style={styles.addButton} accessibilityRole="button">
          <Text style={styles.addLabel}>{t('habits.add')}</Text>
        </Pressable>
      </View>

      {habits.length === 0 ? <Text style={styles.empty}>{t('habits.empty')}</Text> : null}

      {habits.map((habit) => (
        <Pressable
          key={habit.id}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            toggle.mutate({ id: habit.id, done: !habit.doneToday });
          }}
          onLongPress={() => remove.mutate(habit.id)}
          style={[styles.card, habit.doneToday && styles.cardDone]}
        >
          <Text style={styles.check}>{habit.doneToday ? '✓' : '○'}</Text>
          <Text style={styles.habitTitle}>{habit.title}</Text>
          <Text style={styles.streak}>🔥 {habit.streak}</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  addRow: { flexDirection: 'row', gap: spacing.sm },
  input: {
    ...typography.body,
    flex: 1,
    color: colors.text,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  addButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  addLabel: { ...typography.body, fontWeight: '600', color: colors.text },
  empty: { ...typography.body, color: colors.textMuted },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardDone: { borderColor: colors.success },
  check: { ...typography.heading, color: colors.success, width: 24 },
  habitTitle: { ...typography.body, color: colors.text, flex: 1 },
  streak: { ...typography.caption, color: colors.textMuted },
});
