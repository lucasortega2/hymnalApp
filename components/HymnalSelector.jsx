import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
const data = [
  { label: 'Todos', value: 'todos' },
  { label: 'Himnario', value: 'himnario' },
  { label: 'Jovenes', value: 'jovenes' },
  { label: 'Suplementario', value: 'suplementario' },
];

const HymnalSelector = ({ tipoHimnario, handleChangeSelector }) => {
  const [isFocus, setIsFocus] = useState(false);
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
    <View>
      <Dropdown
        activeColor="#1f2937"
        className="h-10 bg-white px-4 rounded-full w-32 "
        style={{
          borderColor: isFocus ? '#3b82f6' : '#d1d5db',
        }}
        itemTextStyle={{
          color: 'white',
          fontFamily: 'Merriweather',
          fontSize: 10,
        }}
        selectedTextStyle={{
          fontSize: 12,
          color: 'black',
          fontFamily: 'Merriweather',
        }}
        selectedTextProps={{ numberOfLines: 1 }}
        inputSearchStyle={{ height: 40, fontSize: 16 }}
        iconStyle={{ width: 20, height: 20 }}
        data={data}
        maxHeight={260}
        labelField="label"
        valueField="value"
        value={tipoHimnario}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setIsFocus(false);
          handleChangeSelector(item.value);
        }}
        containerStyle={{ backgroundColor: '#334155' }}
      />
    </View>
  );
};

export default HymnalSelector;
