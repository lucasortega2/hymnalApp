import HimnoList from '@/components/HymnList';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { HymnsData } from '@/components/types';
import { getHymnsFromDBLocal, saveHymns } from '@/lib/db';
import Title from '../components/Text1';
import { Stack } from 'expo-router';
import StackForPageHymns from '@/components/StackForPageHymns';

const himnos = () => {
  const [hymnsData, setHymnsdata] = useState<HymnsData>({
    hymns: [],
    himnario: [],
    jovenes: [],
    suplementario: [],
  });

  useEffect(() => {
    const getHymns = async () => {
      try {
        const result = await getHymnsFromDBLocal();
        if (result) {
          const { hymns, himnario, jovenes, suplementario } = result;
          setHymnsdata({ hymns, himnario, jovenes, suplementario });
        } else {
          console.error('No se pudieron obtener himnos de la base de datos.');
        }
      } catch (error) {
        console.error('Error al obtener himnos:', error);
      }
    };

    getHymns();
  }, []);

  const getHymnsFromDBCloud = async () => {
    try {
      const response = await fetch(
        'https://himnariojovenes.vercel.app/api/getHymns',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, `);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const refreshDB = async () => {
    const { hymns, jovenes, suplementario, himnario } =
      await getHymnsFromDBCloud();

    const {
      updatedHymns,
      updatedHymnarios,
      updatedJovenes,
      updatedSuplementary,
    } = await saveHymns(hymns, himnario, jovenes, suplementario);

    setHymnsdata({
      hymns: updatedHymns,
      himnario: updatedHymnarios,
      jovenes: updatedJovenes,
      suplementario: updatedSuplementary,
    });
  };
  return (
    <View className="h-full">
      <Stack.Screen
        options={{
          header: ({}) => <StackForPageHymns onPress={refreshDB} />,
        }}
      />

      <View className="flex flex-col items-center w-full px-4 h-full">
        <View className="w-full h-full ">
          <Title className="text-4xl text-center mb-4 text-white drop-shadow-lg">
            Himnos
          </Title>

          <HimnoList hymnsData={hymnsData} />
        </View>
      </View>
    </View>
  );
};

export default himnos;
