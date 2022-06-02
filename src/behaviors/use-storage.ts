import { useEffect, useState } from 'react';

/**
 * So why am I using custom events here? In my experience if you want to rely
 * on local storage you want to make sure you have a solution that works across
 * devices. So while we still lean on the native storage event that _most_ browsers
 * and devices have, we also use the custom event. This also gives us the benefit of
 * getting to write a couple of helper functions to support typed object storage.
 */

export const onLocalStorageChangeType = 'onLocalStorageChange';

export type ValueType = string | unknown | null;
export type KeyValuePair<Value extends ValueType = string> = {
  key: string;
  value: Value;
};

export function setItem(key: string, value: string) {
  localStorage.setItem(key, value);

  const event = new CustomEvent<KeyValuePair>(onLocalStorageChangeType, {
    detail: { key, value },
  });

  window.dispatchEvent(event);
}

export function setObject<Value extends ValueType = unknown>(
  key: string,
  value: Value
) {
  try {
    localStorage.setItem(key, JSON.stringify(value));

    const event = new CustomEvent<KeyValuePair<Value>>(
      onLocalStorageChangeType,
      {
        detail: { key, value },
      }
    );

    window.dispatchEvent(event);
  } catch (error) {
    console.error('Unable to write object to storage', error);
  }
}

export function removeItem(key: string) {
  localStorage.removeItem(key);

  const event = new CustomEvent<KeyValuePair<null>>(onLocalStorageChangeType, {
    detail: { key, value: null },
  });

  window.dispatchEvent(event);
}

export function getObject<Value extends ValueType = unknown>(key: string) {
  try {
    const text = localStorage.getItem(key);

    if (!text) {
      return null;
    }

    const value: Value = JSON.parse(text);
    return value;
  } catch (error) {
    console.error('Unable to get object from storage', error);
  }
}

export function useStorage(
  key: string,
  initialValue?: string
): [string | null, (newValue: string) => void] {
  const [value, setValue] = useState<string | null>(
    localStorage.getItem(key) || initialValue || null
  );

  const storeValue = (newValue: string) => {
    if (newValue) {
      setItem(key, newValue);
      return;
    }

    removeItem(key);
  };

  const onLocalStorageChange = (e: Event) => {
    const event = e as CustomEvent<KeyValuePair> | StorageEvent;

    if (event instanceof CustomEvent) {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    } else if (event.key === key) {
      setValue(event.newValue);
    }
  };

  useEffect(() => {
    window.addEventListener(onLocalStorageChangeType, onLocalStorageChange);
    window.addEventListener('storage', onLocalStorageChange);

    return () => {
      window.removeEventListener(
        onLocalStorageChangeType,
        onLocalStorageChange
      );

      window.removeEventListener('storage', onLocalStorageChange);
    };
  }, []);

  return [value, storeValue];
}

export function useObjectStorage<Value extends ValueType = unknown>(
  key: string,
  initialValue?: Value
): [Value | null, (newValue: Value) => void] {
  const [value, setValue] = useState<Value | null>(
    getObject(key) || initialValue || null
  );

  const storeValue = (newValue: Value) => {
    if (newValue) {
      setObject(key, newValue);
      return;
    }

    removeItem(key);
  };

  const onLocalStorageChange = (e: Event) => {
    const event = e as CustomEvent<KeyValuePair<Value>> | StorageEvent;

    if (event instanceof CustomEvent) {
      if (event.detail.key === key) {
        setValue(event.detail.value as Value);
      }
    } else if (event.key === key) {
      const newValue = event.newValue
        ? (JSON.parse(event.newValue) as Value)
        : null;

      setValue(newValue);
    }
  };

  useEffect(() => {
    window.addEventListener(onLocalStorageChangeType, onLocalStorageChange);
    window.addEventListener('storage', onLocalStorageChange);

    return () => {
      window.removeEventListener(
        onLocalStorageChangeType,
        onLocalStorageChange
      );

      window.removeEventListener('storage', onLocalStorageChange);
    };
  }, []);

  return [value, storeValue];
}
