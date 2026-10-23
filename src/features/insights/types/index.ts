export enum ReflectionSource {
  Claude = 'claude',
  Local = 'local',
}

export interface Reflection {
  text: string;
  source: ReflectionSource;
}
