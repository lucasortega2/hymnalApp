import React, { useEffect } from 'react';
import { Text, ActivityIndicator, View, TextStyle } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

interface TitleProps {
  children: React.ReactNode;
  style?: TextStyle;

  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, style }) => {
  const [loaded, error] = useFonts({
    Cinzel: require('../assets/fonts/Cinzel/static/Cinzel-Regular.ttf'),
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

  return <Text style={[{ fontFamily: 'Cinzel' }, style]}>{children}</Text>;
};

export default Title;
