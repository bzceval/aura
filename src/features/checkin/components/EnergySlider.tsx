import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { colors, radius } from '@/shared/theme/tokens';

const THUMB = 28;
const HAPTIC_STEPS = 10;

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function EnergySlider({ value, onChange }: Props) {
  const [width, setWidth] = useState(0);
  const progress = useSharedValue(value);
  const lastStep = useSharedValue(Math.round(value * HAPTIC_STEPS));

  const emit = (next: number) => onChange(next);
  const tick = () => Haptics.selectionAsync();

  const pan = Gesture.Pan()
    .minDistance(0)
    .onBegin((event) => {
      progress.value = Math.min(Math.max(event.x / width, 0), 1);
    })
    .onUpdate((event) => {
      const next = Math.min(Math.max(event.x / width, 0), 1);
      progress.value = next;
      scheduleOnRN(emit, next);
      const step = Math.round(next * HAPTIC_STEPS);
      if (step !== lastStep.value) {
        lastStep.value = step;
        scheduleOnRN(tick);
      }
    });

  const fillStyle = useAnimatedStyle(() => ({ width: progress.value * width }));
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * (width - THUMB) }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.hit} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  hit: { height: 44, justifyContent: 'center' },
  track: { height: 8, borderRadius: radius.pill, backgroundColor: colors.surfaceRaised, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.accent },
  thumb: {
    position: 'absolute',
    width: THUMB,
    height: THUMB,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
  },
});
