import React, { useEffect } from 'react';
import { Text, ActivityIndicator, View, TextStyle } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

interface TitleProps {
  children: React.ReactNode;
  style?: TextStyle;
  className?: string;
}

const Text1: React.FC<TitleProps> = ({ children, style }) => {
  const [loaded, error] = useFonts({
    Merriweather: require('../assets/fonts/Merriweather/Merriweather-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Text style={[{ fontFamily: 'Merriweather' }, style]}>{children}</Text>
  );
};

export default Text1;
