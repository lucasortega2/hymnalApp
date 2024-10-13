import React, { useState } from 'react';
import ButtonAwesome from './ButtonAwesome';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Clipboard from 'expo-clipboard';

import { Himno } from '@/components/types';
interface CopyButtonProps {
  hymn: Himno | null;
}
const CopyButton: React.FC<CopyButtonProps> = ({ hymn }) => {
  const [buttonIcon, setButtonIcon] =
    useState<keyof typeof FontAwesome.glyphMap>('copy');
  const [color, setColor] = useState('white');

  const copyToClipboard = async () => {
    if (hymn) {
      try {
        await Clipboard.setStringAsync(`${hymn.titulo}\n\r\n${hymn.letra}`);
        setButtonIcon('check');
        setColor('green');
        setTimeout(() => {
          setButtonIcon('copy');
          setColor('white');
        }, 1000);
      } catch (error) {}
    }
  };

  return (
    <ButtonAwesome
      name={buttonIcon}
      onPress={copyToClipboard}
      color={color}
      size={25}
    />
  );
};

export default CopyButton;
