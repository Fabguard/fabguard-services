
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  couponCode?: string;
  discount: number;
  finalTotal: number;
}

export interface Membership {
  id: number;
  name: string;
  price: number;
  validity: string;
  discount: string;
  services: string[];
  features: string[];
  color: string;
  bgGradient: string;
  popular?: boolean;
}
