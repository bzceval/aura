import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { t } from '@/shared/i18n';
import { colors, radius, spacing, typography } from '@/shared/theme';
import { VALENCE_EMOJI, Valence } from '../types';

const OPTIONS = [
  Valence.Drained,
  Valence.Low,
  Valence.Okay,
  Valence.Good,
  Valence.Radiant,
] as const;

interface Props {
  value: Valence;
  onChange: (value: Valence) => void;
}

function Option({ option, selected, onPress }: { option: Valence; selected: boolean; onPress: () => void }) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(selected ? 1.18 : 1, { damping: 12 }) }],
  }));

  return (
    <Pressable onPress={onPress} style={styles.option} accessibilityRole="button">
      <Animated.View style={[styles.emojiWrap, selected && styles.emojiSelected, animatedStyle]}>
        <Text style={styles.emoji}>{VALENCE_EMOJI[option]}</Text>
      </Animated.View>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {t(`valence.${option}`)}
      </Text>
    </Pressable>
  );
}

export function ValencePicker({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => (
        <Option
          key={option}
          option={option}
          selected={option === value}
          onPress={() => {
            Haptics.selectionAsync();
            onChange(option);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  option: { alignItems: 'center', gap: spacing.sm, flex: 1 },
  emojiWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emojiSelected: { backgroundColor: colors.surfaceRaised, borderColor: colors.accent },
  emoji: { fontSize: 26 },
  label: { ...typography.caption, color: colors.textMuted },
  labelSelected: { color: colors.text },
});
