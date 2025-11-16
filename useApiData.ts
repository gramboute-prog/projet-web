// src/hooks/useApiData.ts
import { useState, useEffect } from 'react';

export function useApiData<T>(apiMethod: () => Promise<T>, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiMethod();
        setData(result);
      } catch (err) {
        setError('Erreur API');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiMethod]);

  return { data, loading, error };
}