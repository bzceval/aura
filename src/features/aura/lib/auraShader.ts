import { Skia } from '@shopify/react-native-skia';

const SOURCE = `
uniform float2 resolution;
uniform float time;
uniform float3 colorA;
uniform float3 colorB;
uniform float energy;

float hash(float2 p) {
  return fract(sin(dot(p, float2(127.1, 311.7))) * 43758.5453);
}

float noise(float2 p) {
  float2 i = floor(p);
  float2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + float2(1.0, 0.0)), f.x),
    mix(hash(i + float2(0.0, 1.0)), hash(i + float2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(float2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

half4 main(float2 fragCoord) {
  float2 uv = (fragCoord * 2.0 - resolution) / min(resolution.x, resolution.y);
  float r = length(uv) * 1.15;
  float t = time * (0.12 + energy * 0.55);

  float2 q = float2(fbm(uv * 1.4 + t), fbm(uv * 1.4 - t + 5.2));
  float f = fbm(uv * 1.8 + q * (1.0 + energy * 2.2) + t);

  float3 col = mix(colorA, colorB, smoothstep(0.15, 0.85, f));
  col += 0.3 * pow(max(1.0 - r, 0.0), 2.0) * colorB;
  col += smoothstep(0.55, 1.0, r) * 0.35 * colorA;

  float body = smoothstep(1.0, 0.94, r);
  float halo = exp(-max(r - 1.0, 0.0) * 5.0) * (1.0 - body) * 0.55;
  float alpha = clamp(body + halo, 0.0, 1.0);
  float3 premultiplied = col * body + colorB * halo;
  return half4(half3(premultiplied), half(alpha));
}
`;

export const auraEffect = Skia.RuntimeEffect.Make(SOURCE);
