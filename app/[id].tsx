import { View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { getHymn, getNumberHymn } from '@/lib/db';
import { useEffect, useState } from 'react';
import { Himno } from '@/components/types';
import Text from '../components/Text1';
import StackForHymn from '@/components/StackForHymn';
import NumberHymn from '@/components/NumberHymn';
import CopyButton from '@/components/CopyButton';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonLink from '@/components/ButtonLink';
import ButtonAwesome from '@/components/ButtonAwesome';

export default function Hymn() {
  const { id } = useLocalSearchParams();
  const formatId = String(id);
  const [hymn, setHymn] = useState<Himno | null>(null);
  const [numberHimnario, setNumberHimnario] = useState<number | string>('');
  const [numberJovenes, setNumberJovenes] = useState<number | string>('');
  const [numberSuplementario, setNumberSuplementario] = useState<
    string | number
  >('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };
  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 14)); // Limitar el mínimo a 10
  };
  useEffect(() => {
    const fetchHymn = async () => {
      try {
        const hymnData = await getHymn(formatId);
        const numberHimnario = await getNumberHymn(formatId, 'Himnario');
        const numberJovenes = await getNumberHymn(formatId, 'Jovenes');
        const numberSuplementario = await getNumberHymn(
          formatId,
          'Suplementario',
        );

        setHymn(hymnData);
        if (numberHimnario) setNumberHimnario(numberHimnario.numero);
        if (numberJovenes) setNumberJovenes(numberJovenes.numero);
        if (numberSuplementario)
          setNumberSuplementario(numberSuplementario.numero);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchHymn();
  }, [formatId]);
  const hasChords = hymn?.acorde && hymn.acorde.trim() !== '';

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          header: ({}) => <StackForHymn title={hymn?.titulo} />,
        }}
      />
      <LinearGradient colors={['#1e293b', '#334155']} className="flex-1 ">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="mx-6"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View className="items-center mb-2">
            <Text
              className="text-white/80 mt-4 leading-relaxed "
              style={{ fontSize }}
            >
              {hymn?.letra}
            </Text>
          </View>
          <View className="flex-row justify-end mb-3 ">
            {numberHimnario && (
              <NumberHymn numero={numberHimnario} fontSize={fontSize} />
            )}
            {numberJovenes && (
              <NumberHymn numero={numberJovenes} fontSize={fontSize} />
            )}
            {numberSuplementario && (
              <NumberHymn numero={numberSuplementario} fontSize={fontSize} />
            )}
          </View>
        </ScrollView>
        <LinearGradient colors={['#1e293b', '#27313f']}>
          <View className="flex-row justify-between px-6 py-3 items-center ">
            <ButtonLink
              url="/hymns"
              name="home"
              size={25}
              classname="bg-gray-800 py-4 px-4 "
            />
            <CopyButton hymn={hymn} />
            <ButtonAwesome
              onPress={() => setIsModalVisible(true)}
              color="green"
              name="music"
              size={25}
              classname="bg-gray-800 py-4 px-4 opacity-40"
              disabled={true}
            />
            <ButtonAwesome
              onPress={decreaseFontSize}
              color="white"
              name="minus"
              size={25}
              classname="bg-gray-800 py-4 px-4"
            />
            <ButtonAwesome
              onPress={increaseFontSize}
              color="white"
              name="plus"
              size={25}
              classname="bg-gray-800 py-4 px-4"
            />
          </View>
        </LinearGradient>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View className="bg-slate-800 rounded-lg p-8 w-4/5">
            <Text className="text-2xl font-bold mb-4 text-white">Acordes</Text>
            <Text className="text-lg mb-4 text-white">{hymn?.acorde}</Text>
            <TouchableOpacity
              className="bg-blue-500 px-4 py-2 rounded-lg self-center"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-white font-bold">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}
