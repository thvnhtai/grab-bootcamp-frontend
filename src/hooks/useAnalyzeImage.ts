import { useCallback, useState } from 'react';
import { Restaurant } from '../types/restaurant';
import { analyzeImage } from '../services/restaurant.service';

export const useAnalyzeImage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeImage(file);
      setRestaurants(data);
      return data;
    } catch (err) {
      console.error('Failed to analyze image:', err);
      setError('Analysis failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { restaurants, isLoading, error, analyzeImage: analyze };
};
