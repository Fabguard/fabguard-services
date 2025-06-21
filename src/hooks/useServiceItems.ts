
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export interface ServiceItem {
  id: number;
  service_id: number;
  item_name: string;
  created_at: string;
  updated_at: string;
}

export function useServiceItems(serviceId?: number) {
  return useQuery({
    queryKey: ['service-items', serviceId],
    queryFn: async (): Promise<ServiceItem[]> => {
      let query = supabase
        .from('service_items')
        .select('*')
        .order('item_name', { ascending: true });

      if (serviceId) {
        query = query.eq('service_id', serviceId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching service items:', error);
        throw error;
      }

      return data || [];
    },
    enabled: serviceId !== undefined
  })
}
