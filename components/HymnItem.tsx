import React from 'react';
import { View, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { Link } from 'expo-router';
import Text from '@/components/Text1';
const StyledView = styled(View);

const StyledPressable = styled(Pressable);

interface HymnItemProps {
  himno: {
    id: string;
    titulo: string;
  };
  numero?: string;
}

const HymnItem: React.FC<HymnItemProps> = ({ himno, numero }) => {
  return (
    <Link asChild href={`/${himno.id}`}>
      <StyledPressable className="h-12 justify-center px-4 bg-slate-700/50 rounded-xl mb-2 active:bg-slate-700/70">
        {({ pressed }) => (
          <StyledView
            className={`flex-row items-center ${pressed ? 'opacity-70' : ''}`}
          >
            <Text className="text-slate-200 text-xs ">{himno.titulo}</Text>
            {numero && (
              <Text className="ml-2 text-slate-400 text-sm">({numero})</Text>
            )}
          </StyledView>
        )}
      </StyledPressable>
    </Link>
  );
};

export default HymnItem;
