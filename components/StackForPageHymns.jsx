import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import ButtonAwesome from './ButtonAwesome';
import ButtonLink from '@/components/ButtonLink';

const StackForPageHymns = ({ onPress }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Función para manejar la rotación del botón
  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  // Función que se ejecuta cuando el botón es presionado
  const handlePress = async () => {
    setIsLoading(true);
    startRotation();

    await onPress(); // Llamar la función de refreshDB

    // Detener la rotación y marcar como cargado
    setIsLoading(false);
    setIsLoaded(true);

    // Volver a estado normal después de 1 segundo
    setTimeout(() => {
      setIsLoaded(false);
    }, 500);
  };

  // Interpolación para la rotación
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (!isLoading) {
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0); // Resetear animación cuando no está cargando
    }
  }, [isLoading]);

  return (
    <View className="flex-row justify-between pt-12 pb-4 px-4">
      <ButtonLink
        url={'/'}
        name="home"
        size={25}
        classname="py-4 px-4 bg-slate-800"
      />
      <Animated.View style={{ transform: [{ rotate }] }}>
        <ButtonAwesome
          onPress={handlePress}
          name="refresh"
          color={isLoaded ? 'green' : 'white'} // Cambia a verde cuando termine la carga
          size={25}
          classname="bg-slate-800 w-14 px-4 py-4 "
        />
      </Animated.View>
    </View>
  );
};

export default StackForPageHymns;
