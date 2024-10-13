import { View } from 'react-native';
import Text1 from './Text1';

export default function NumberHymn({ numero, fontSize }) {
  return (
    <View className="bg-slate-800 bg-opacity-50 p-3 rounded-lg">
      <Text1 style={{ fontSize }} className="text-white ">
        Himnario: {numero}
      </Text1>
    </View>
  );
}
