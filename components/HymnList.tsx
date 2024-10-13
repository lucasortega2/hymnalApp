import { useHymns } from '@/hooks/useHymns';
import useInput from '@/hooks/useInput';
import usePagination from '@/hooks/usePagination';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import HymnalSelector from './HymnalSelector';
import type { HymnListProps } from '@/components/types';
import HymnItem from './HymnItem';
import Pagination from './Pagination';
import { FontAwesome } from '@expo/vector-icons';
import Text1 from './Text1';
import { useRef } from 'react';

const HymnList = ({ hymnsData }: HymnListProps) => {
  const { hymns, jovenes, suplementario, himnario } = hymnsData;
  const { tipoHimnario, setTipoHimnario, obtenerIdsYNumeros, filtrarHimnos } =
    useHymns(hymns, jovenes, himnario, suplementario);
  const { input, handleInput } = useInput();
  const filteredHimnos = filtrarHimnos(input);
  const handleChangeSelector = (value: string) => {
    setTipoHimnario(value);
  };
  const flatListRef = useRef<FlatList>(null);
  const {
    currentHymns,
    hymnPerPage,
    handlePageChange,
    currentPage,
    handlePrevious,
    handleNext,
    pages,
  } = usePagination(filteredHimnos, flatListRef);

  return (
    <View className="h-full flex-1">
      <View>
        <View className="mb-6 flex-row justify-between relative w-full ">
          <TextInput
            value={input}
            placeholder="Titulo o número"
            onChangeText={(e) => {
              handleInput(e);
              handlePageChange(1);
            }}
            className="w-52 bg-white border border-gray-300 rounded-full h-10 pl-4 pr-8"
          />
          {input.length > 0 && (
            <Pressable
              onPress={() => handleInput('')}
              className="items-center justify-center absolute left-40 w-12 h-10    "
            >
              <FontAwesome color="black" name="close" size={17} />
            </Pressable>
          )}
          <HymnalSelector
            tipoHimnario={tipoHimnario}
            handleChangeSelector={handleChangeSelector}
          />
        </View>
      </View>
      <View>
        <FlatList
          className="h-[550]"
          showsVerticalScrollIndicator={false}
          data={currentHymns}
          keyExtractor={(item) => item.id}
          ref={flatListRef}
          renderItem={({ item }) => {
            const match = obtenerIdsYNumeros.find(
              (hymn: any) => hymn.id === item.id,
            );
            const numero = match ? match.numero : null;
            return <HymnItem himno={item} numero={numero} />;
          }}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center mt-12">
              <Text1 className="text-gray-500">No se encontraron himnos</Text1>
            </View>
          )}
        />
        <Pagination
          pages={pages}
          currentPage={currentPage}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handlePageChange={handlePageChange}
        />
      </View>
    </View>
  );
};

export default HymnList;
