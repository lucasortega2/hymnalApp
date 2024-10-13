import React from 'react';
import { View, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
interface RefreshButtonProps {
  onPress: () => void;
  name: keyof typeof FontAwesome.glyphMap;
  color: string;
  size: number;
  style?: string;
  disabled?: boolean;
}

const ButtonAwesome: React.FC<RefreshButtonProps> = ({
  onPress,
  name,
  color,
  size,
  style,
  disabled = false,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`active:scale-95 transition-all duration-150 h-max w-max ${style} disabled:true `}
    >
      {({ pressed }) => (
        <View className="w-14 flex-row items-center justify-center  px-4 py-4  rounded-full bg-gray-800 shadow-md">
          <FontAwesome
            name={name}
            size={size}
            color="white"
            style={{
              opacity: pressed ? 0.7 : 1,
              color: color,
            }}
          />
        </View>
      )}
    </Pressable>
  );
};

export default ButtonAwesome;
