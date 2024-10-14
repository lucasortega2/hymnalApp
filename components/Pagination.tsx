import { View, Text, Pressable } from 'react-native';
import ButtonAwesome from './ButtonAwesome';

const Pagination = ({
  pages,
  handlePageChange,
  currentPage,
  handlePrevious,
  handleNext,
}: {
  pages: (number | '...')[];
  handlePrevious: () => void;
  handleNext: () => void;
  handlePageChange: (page: number | '...') => void;
  currentPage: number;
}) => {
  return (
    <View className="flex-row items-center justify-between h-24 ">
      <ButtonAwesome
        name="arrow-left"
        size={20}
        color="white"
        onPress={handlePrevious}
        classname="w-12 bg-slate-800 px-2 py-3"
      />

      <View className="flex-row space-x-1 ">
        {pages.map((page, index) => (
          <Pressable
            key={index}
            onPress={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              page === currentPage
                ? 'bg-white'
                : 'bg-white/20 active:bg-white/30'
            } ${page === '...' ? 'bg-transparent' : ''}`}
            disabled={page === '...'}
          >
            <Text
              className={`text-sm ${
                page === currentPage ? 'text-blue-600' : 'text-white'
              }`}
            >
              {page}
            </Text>
          </Pressable>
        ))}
      </View>

      <ButtonAwesome
        name="arrow-right"
        size={20}
        color="white"
        onPress={handleNext}
        classname="w-12 bg-slate-800 px-2 py-3"
      />
    </View>
  );
};

export default Pagination;
