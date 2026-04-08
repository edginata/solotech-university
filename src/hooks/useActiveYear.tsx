import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const fallbackYear = new Date().getFullYear();

let cachedYear: number | null = null;
let fetchPromise: Promise<number> | null = null as any;

const fetchYear = (): Promise<number> => {
  if (!fetchPromise) {
    fetchPromise = (async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'active_year')
        .maybeSingle();
      const y = data?.value ? parseInt(data.value) : fallbackYear;
      cachedYear = isNaN(y) ? fallbackYear : y;
      return cachedYear;
    })();
  }
  return fetchPromise;
};

export const useActiveYear = () => {
  const [year, setYear] = useState(cachedYear ?? fallbackYear);

  useEffect(() => {
    if (cachedYear !== null) {
      setYear(cachedYear);
    } else {
      fetchYear().then(setYear);
    }
  }, []);

  return year;
};
