import { Canvas, Fill, Shader, useClock } from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { auraEffect } from '../lib/auraShader';
import { auraPalette } from '../lib/palette';

interface Props {
  valence: number;
  energy: number;
  size: number;
  style?: StyleProp<ViewStyle>;
}

const TRANSITION_MS = 700;

export function AuraOrb({ valence, energy, size, style }: Props) {
  const clock = useClock();
  const animatedValence = useSharedValue(valence);
  const animatedEnergy = useSharedValue(energy);

  useEffect(() => {
    animatedValence.value = withTiming(valence, { duration: TRANSITION_MS });
    animatedEnergy.value = withTiming(energy, { duration: TRANSITION_MS });
  }, [valence, energy, animatedValence, animatedEnergy]);

  const uniforms = useDerivedValue(() => {
    const palette = auraPalette(animatedValence.value, animatedEnergy.value);
    return {
      resolution: [size, size],
      time: clock.value / 1000,
      colorA: palette.primary,
      colorB: palette.secondary,
      energy: animatedEnergy.value,
    };
  });

  if (!auraEffect) return null;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Canvas style={styles.canvas}>
        <Fill>
          <Shader source={auraEffect} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({ canvas: { flex: 1 } });
