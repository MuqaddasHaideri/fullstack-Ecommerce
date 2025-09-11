import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useColorScheme } from '@/hooks/useColorScheme';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      handCursiveBold: require("../assets/fonts/EduNSWACTCursive-Bold.ttf"),
      handCursiveMedium: require("../assets/fonts/EduNSWACTCursive-Medium.ttf"),
      handCursiveRegular: require("../assets/fonts/EduNSWACTCursive-Regular.ttf"),
      handCursiveSemiBold: require("../assets/fonts/EduNSWACTCursive-SemiBold.ttf"),
      handCursiveVariable: require("../assets/fonts/EduNSWACTCursive-VariableFont_wght.ttf"),
  
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Screens/login" options={{ headerShown: false }} />
        <Stack.Screen name="Screens/signUp" options={{ headerShown: false }} />
        <Stack.Screen name="Screens/ProductDetail" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </Provider>
  );
}
