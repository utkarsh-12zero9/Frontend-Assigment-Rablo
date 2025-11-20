import { useState, useCallback } from 'react';

export const useSearch = (data) => {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = useCallback(() => {
    setSearchError(null);
    setSearchResult(null);

    if (!searchId.trim()) {
      setSearchError('Please enter an employee ID');
      return;
    }

    const result = data.find((item) => item.id === parseInt(searchId.trim()));

    if (result) {
      setSearchResult(result);
    } else {
      setSearchError('No employee found with this ID');
    }
  }, [searchId, data]);

  const clearSearch = useCallback(() => {
    setSearchId('');
    setSearchResult(null);
    setSearchError(null);
  }, []);

  return {
    searchId,
    setSearchId,
    searchResult,
    searchError,
    handleSearch,
    clearSearch,
  };
};
