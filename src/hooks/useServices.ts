
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Service } from '@/types/types'

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Service[]> => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })

      if (error) {
        console.error('Error fetching services:', error)
        throw error
      }

      return data.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: service.price,
        image: service.image_url,
        category: service.category
      }))
    }
  })
}
