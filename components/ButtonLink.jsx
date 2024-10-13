import { Link } from 'expo-router';
import React from 'react';
import { View, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ButtonLink = ({ url, name, size }) => {
  return (
    <Link href={url} asChild>
      <Pressable className="active:scale-95 transition-all duration-150">
        {({ pressed }) => (
          <View className=" flex-row items-center justify-center space-x-2 px-4 py-4 rounded-full bg-gray-800 shadow-md">
            <FontAwesome
              name={name}
              size={size}
              color="white"
              style={{ opacity: pressed ? 0.7 : 1 }}
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
};

export default ButtonLink;
