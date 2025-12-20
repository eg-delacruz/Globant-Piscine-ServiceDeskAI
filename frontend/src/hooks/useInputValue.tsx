import { useState } from 'react';

// Hook para manejar/controlar la info de los inputs
export const useInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setValue(e.target.value);

  return { value, onChange, setValue };
};
