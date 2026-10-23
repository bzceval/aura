import * as Haptics from 'expo-haptics';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/tokens';

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({ label, onPress, loading = false, disabled = false }: Props) {
  const inactive = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={inactive}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onPress();
      }}
      style={({ pressed }) => [styles.button, inactive && styles.inactive, pressed && styles.pressed]}
    >
      {loading ? <ActivityIndicator color={colors.bg} /> : <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.text,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  inactive: { opacity: 0.5 },
  pressed: { transform: [{ scale: 0.98 }] },
  label: { ...typography.body, fontWeight: '600', color: colors.bg },
});
