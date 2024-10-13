import React from 'react';
import { View, Pressable } from 'react-native';
import Song from '../components/svg/SongSvg';
import { Link } from 'expo-router';
import Title from '../components/Title';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center space-y-40 items-center w-full ">
        <Title className="text-3xl text-white text-center tracking-wider ">
          Himnario{'\n'}de{'\n'}Jovenes
        </Title>
        <View className="w-4/5 max-w-md rounded-3xl p-6 space-y-6">
          <Link href="/hymns" asChild>
            <Pressable
              className="w-full py-4 bg-blue-600 rounded-full shadow-md active:bg-blue-700 active:scale-95"
              onPress={() => {}}
            >
              <View className="flex-row items-center justify-center">
                <Song width={24} height={24} className="mr-2" stroke="white" />
                <Title className="text-sm text-white">Himnos</Title>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
