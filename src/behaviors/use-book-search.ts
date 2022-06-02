import { useState } from 'react';
import qs from 'query-string';

import { BookResult } from '../utils/book';

export const useBookSearch = () => {
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const setPaginationUrls = ({ next, previous }: BookResult) => {
    setNextUrl(next);
    setPrevUrl(previous);
  };

  const searchForBook = async (search: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://gutendex.com/books?${qs.stringify({ search })}`
      );

      const data = await response.json();
      setPaginationUrls(data);
      setLoading(false);

      return data as BookResult;
    } catch (e) {
      console.error('Error searching for books', e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const prev = async () => {
    setLoading(true);

    if (prevUrl) {
      try {
        const response = await fetch(prevUrl);
        const data = (await response.json()) as BookResult;
        setPaginationUrls(data);
        return data;
      } catch (e) {
        console.error('Error fetching previous books', e);
        return null;
      } finally {
        setLoading(false);
      }
    }
  };

  const next = async () => {
    setLoading(true);

    if (nextUrl) {
      try {
        const response = await fetch(nextUrl);
        const data = (await response.json()) as BookResult;
        setPaginationUrls(data);
        return data;
      } catch (e) {
        console.error('Error fetching next books', e);
        return null;
      } finally {
        setLoading(false);
      }
    }
  };

  return { loading, searchForBook, prev, prevUrl, next, nextUrl };
};

export default useBookSearch;
