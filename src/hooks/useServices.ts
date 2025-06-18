
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Service } from '@/types/types'

export function useServices() {
  return useQuery({
    queryKey: ['services'],
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
