import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useCheckInList } from '@/features/checkin/hooks/useCheckIns';
import { t } from '@/shared/i18n';
import { colors, spacing, typography } from '@/shared/theme/tokens';
import { AuraThumb } from './AuraThumb';

const COLUMNS = 3;
const GAP = spacing.md;
const SIDE = spacing.lg;

export function JourneyScreen() {
  const { data = [] } = useCheckInList();
  const [width, setWidth] = useState(0);
  const size = width ? (width - SIDE * 2 - GAP * (COLUMNS - 1)) / COLUMNS : 0;

  return (
    <View style={styles.root} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <FlatList
        data={data}
        numColumns={COLUMNS}
        keyExtractor={(item) => String(item.id)}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        ListHeaderComponent={<Text style={styles.title}>{t('journey.title')}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>{t('journey.empty')}</Text>}
        renderItem={({ item }) =>
          size ? (
            <View style={{ width: size }}>
              <AuraThumb valence={item.valence} energy={item.energy} size={size} seed={item.id * 7.3} />
              <Text style={styles.day}>{item.day.slice(5)}</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: SIDE, paddingTop: 72, paddingBottom: spacing.xl, gap: GAP },
  row: { gap: GAP },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.md },
  empty: { ...typography.body, color: colors.textMuted },
  day: { ...typography.caption, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xs },
});
