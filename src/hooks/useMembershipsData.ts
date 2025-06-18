
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
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
        services: membership.services_included || [],
        features: membership.features || [],
        color: membership.color,
        bgGradient: membership.bg_gradient,
        popular: membership.is_popular
      }))
    }
  })
}
