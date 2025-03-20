import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // @ts-ignore
  import('react-native-svg-web');
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return children;
}