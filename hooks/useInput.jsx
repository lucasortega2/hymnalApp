import { useState } from 'react';

const useInput = () => {
  const [input, setInput] = useState('');
  const handleInput = (value) => {
    setInput(value);
  };
  return { input, handleInput };
};

export default useInput;
