import { Link } from 'expo-router';
import React from 'react';
import { View, Pressable } from 'react-native';
import ButtonAwesome from './ButtonAwesome';
import { FontAwesome } from '@expo/vector-icons';

const ButtonLink = ({ url, name, size, classname }) => {
  return (
    <Link href={url} asChild>
      <Pressable
        className={`rounded-full active:scale-95 transition-all duration-150 ${classname}`}
      >
        {({ pressed }) => (
          <View className="  shadow-md">
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
