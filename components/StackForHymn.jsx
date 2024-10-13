import React from 'react';
import { View } from 'react-native';
import Title from './Title';

const StackForHymn = ({ title }) => {
  return (
    <View className="pt-12 pb-4 px-4">
      <Title className="text-2xl text-white text-center mt-4">{title}</Title>
    </View>
  );
};

export default StackForHymn;
