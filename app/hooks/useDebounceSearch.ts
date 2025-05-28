import { useEffect, useState, useRef } from 'react';

/**
 * A hook that provides debounced search functionality to prevent excessive API calls
 */
export const useDebounceSearch = (delay: number = 300) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, delay]);

  return { search, setSearch, debouncedSearch };
};
