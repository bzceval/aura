import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme/tokens';

interface Props {
  title: string;
  children: ReactNode;
  scroll?: boolean;
}

export function Screen({ title, children, scroll = true }: Props) {
  const insets = useSafeAreaInsets();
  const padding = { paddingTop: insets.top + spacing.md };

  const content = (
    <>
      <Text style={styles.title}>{title}</Text>
      {children}
    </>
  );

  if (!scroll) {
    return <View style={[styles.root, styles.content, padding]}>{content}</View>;
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, padding]}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
    >
      {content}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, gap: spacing.lg },
  title: { ...typography.title, color: colors.text },
});
