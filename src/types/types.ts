
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
