export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      coupons: {
        Row: {
          code: string
          created_at: string | null
          discount_amount: number
          discount_type: string | null
          id: number
          is_active: boolean | null
          min_order_amount: number | null
          updated_at: string | null
          usage_limit: number | null
          used_count: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          discount_amount: number
          discount_type?: string | null
          id?: number
          is_active?: boolean | null
          min_order_amount?: number | null
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          discount_amount?: number
          discount_type?: string | null
          id?: number
          is_active?: boolean | null
          min_order_amount?: number | null
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      customer_memberships: {
        Row: {
          created_at: string | null
          customer_id: string | null
          end_date: string
          id: string
          is_active: boolean | null
          membership_id: number | null
          referral_code: string | null
          start_date: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          membership_id?: number | null
          referral_code?: string | null
          start_date: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          membership_id?: number | null
          referral_code?: string | null
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_memberships_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_memberships_membership_id_fkey"
            columns: ["membership_id"]
            isOneToOne: false
            referencedRelation: "memberships"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          bg_gradient: string | null
          color: string | null
          created_at: string | null
          discount_percentage: number | null
          features: Json | null
          id: number
          is_active: boolean | null
          is_popular: boolean | null
          name: string
          price: number
          services_included: Json | null
          updated_at: string | null
          validity_months: number | null
        }
        Insert: {
          bg_gradient?: string | null
          color?: string | null
          created_at?: string | null
          discount_percentage?: number | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          is_popular?: boolean | null
          name: string
          price: number
          services_included?: Json | null
          updated_at?: string | null
          validity_months?: number | null
        }
        Update: {
          bg_gradient?: string | null
          color?: string | null
          created_at?: string | null
          discount_percentage?: number | null
          features?: Json | null
          id?: number
          is_active?: boolean | null
          is_popular?: boolean | null
          name?: string
          price?: number
          services_included?: Json | null
          updated_at?: string | null
          validity_months?: number | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          quantity: number
          service_id: number | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          quantity?: number
          service_id?: number | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          quantity?: number
          service_id?: number | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          coupon_code: string | null
          created_at: string | null
          customer_id: string | null
          customer_note: string | null
          discount_amount: number | null
          final_amount: number
          id: string
          payment_method: string | null
          status: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          coupon_code?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_note?: string | null
          discount_amount?: number | null
          final_amount: number
          id?: string
          payment_method?: string | null
          status?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          coupon_code?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_note?: string | null
          discount_amount?: number | null
          final_amount?: number
          id?: string
          payment_method?: string | null
          status?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_registrations: {
        Row: {
          city: string
          created_at: string | null
          email: string | null
          experience: string | null
          id: string
          message: string | null
          name: string
          phone: string
          skills: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          city: string
          created_at?: string | null
          email?: string | null
          experience?: string | null
          id?: string
          message?: string | null
          name: string
          phone: string
          skills: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string
          created_at?: string | null
          email?: string | null
          experience?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string
          skills?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      service_items: {
        Row: {
          created_at: string | null
          id: number
          item_name: string
          service_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_name: string
          service_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          item_name?: string
          service_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
