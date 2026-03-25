import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings.ts';

export default function useSettings() {
  // Get settings.
  const { isLoading, error, data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  });

  return { isLoading, settings, error };
}
