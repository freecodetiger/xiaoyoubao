'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useUrlState<T>(
  initialState: T,
  key: string,
  options: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  } = {}
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState<T>(() => {
    const urlValue = searchParams.get(key);
    if (urlValue) {
      try {
        return options.deserialize
          ? options.deserialize(urlValue)
          : JSON.parse(urlValue);
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    const urlValue = searchParams.get(key);
    if (urlValue) {
      try {
        const parsedValue = options.deserialize
          ? options.deserialize(urlValue)
          : JSON.parse(urlValue);
        setState(parsedValue);
      } catch {
        setState(initialState);
      }
    }
  }, [searchParams, key, initialState, options]);

  const updateState = useCallback(
    (newState: T | ((prev: T) => T)) => {
      const updatedState = typeof newState === 'function'
        ? (newState as ((prev: T) => T))(state)
        : newState;
      
      setState(updatedState);

      const params = new URLSearchParams(searchParams.toString());
      const serializedValue = options.serialize
        ? options.serialize(updatedState)
        : JSON.stringify(updatedState);
      
      if (serializedValue === JSON.stringify(initialState)) {
        params.delete(key);
      } else {
        params.set(key, serializedValue);
      }

      const search = params.toString();
      const query = search ? `?${search}` : '';
      router.replace(`${pathname}${query}`);
    },
    [state, pathname, router, searchParams, key, initialState, options]
  );

  return [state, updateState] as const;
} 