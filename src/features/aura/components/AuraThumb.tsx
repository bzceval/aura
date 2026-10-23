import { Canvas, Fill, Shader } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { auraEffect } from '../lib/auraShader';
import { auraPalette } from '../lib/palette';

interface Props {
  valence: number;
  energy: number;
  size: number;
  seed: number;
}

/** Static, non-animated orb for lists — one frozen frame per day. */
export function AuraThumb({ valence, energy, size, seed }: Props) {
  const uniforms = useMemo(() => {
    const palette = auraPalette(valence, energy);
    return {
      resolution: [size, size],
      time: seed,
      colorA: palette.primary,
      colorB: palette.secondary,
      energy,
    };
  }, [valence, energy, size, seed]);

  if (!auraEffect) return null;

  return (
    <View style={{ width: size, height: size }}>
      <Canvas style={styles.canvas}>
        <Fill>
          <Shader source={auraEffect} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({ canvas: { flex: 1 } });
