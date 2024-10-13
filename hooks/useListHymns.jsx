import { useEffect, useState } from 'react';

const useListHymns = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const addToFavorites = (himnoId) => {
    if (!favoritos.includes(himnoId)) {
      setFavoritos([...favoritos, himnoId]);
    } else {
      setFavoritos(favoritos.filter((id) => id !== himnoId));
    }
  };
  const isFavorite = (himnoId) => favoritos.includes(himnoId);
  return { favoritos, addToFavorites, isFavorite };
};

export default useListHymns;
