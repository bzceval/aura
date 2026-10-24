import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { t } from '@/shared/i18n';
import { colors } from '@/shared/theme';

type IconName = keyof typeof Ionicons.glyphMap;

const TABS: { name: string; title: Parameters<typeof t>[0]; icon: IconName }[] = [
  { name: 'index', title: 'tabs.today', icon: 'sparkles' },
  { name: 'journey', title: 'tabs.journey', icon: 'planet' },
  { name: 'habits', title: 'tabs.habits', icon: 'checkmark-circle' },
  { name: 'insights', title: 'tabs.insights', icon: 'bulb' },
  { name: 'settings', title: 'tabs.settings', icon: 'settings' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}
    >
      {TABS.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: t(title),
            tabBarIcon: ({ color, size }) => <Ionicons name={icon} size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}
