import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export default function useLocalStorage<T>(storageKey: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  }, [storageKey, initialValue]);

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}
