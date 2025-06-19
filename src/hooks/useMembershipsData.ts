
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Membership } from '@/types/types'

export function useMembershipsData() {
  return useQuery({
    queryKey: ['memberships'],
    queryFn: async (): Promise<Membership[]> => {
      const { data, error } = await supabase
        .from('memberships')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })

      if (error) {
        console.error('Error fetching memberships:', error)
        throw error
      }

      return data.map(membership => ({
        id: membership.id,
        name: membership.name,
        price: membership.price,
        validity: `${membership.validity_months}-Year Validity`,
        discount: `${membership.discount_percentage}% Discount`,
        services: Array.isArray(membership.services_included) ? membership.services_included as string[] : [],
        features: Array.isArray(membership.features) ? membership.features as string[] : [],
        color: membership.color || '',
        bgGradient: membership.bg_gradient || '',
        popular: membership.is_popular || false
      }))
    }
  })
}
