
import { useCallback } from "react";
import { Membership, OrderDetails, CartItem } from "@/types/types";

export function useMemberships() {
  const memberships: Membership[] = [
    {
      id: 1,
      name: "Gold Membership",
      price: 2000,
      validity: "1-Year Validity",
      discount: "10% Discount on every order",
      services: ["Clothes Ironing Services", "Dry Cleaning Services"],
      features: ["Quick Service", "Exclusive Coupon Code"],
      color: "gold",
      bgGradient: "bg-gradient-to-r from-yellow-400 to-yellow-600"
    },
    {
      id: 2,
      name: "Platinum Membership",
      price: 2299, // Updated price
      validity: "1-Year Validity",
      discount: "10% Discount on every order",
      services: [
        "Clothes Ironing Services",
        "Dry Cleaning Services",
        "Electrical Services",
        "Plumbing Services"
      ],
      features: ["Quick Service", "Exclusive Coupon Code"],
      color: "platinum",
      bgGradient: "bg-gradient-to-r from-gray-400 to-gray-600",
      popular: true
    },
    {
      id: 3,
      name: "Diamond Membership",
      price: 2499, // Updated price
      validity: "1-Year Validity",
      discount: "10% Discount on every order",
      services: [
        "Clothes Ironing Services",
        "Dry Cleaning Services",
        "Electrical Services",
        "Plumbing Services",
        "Carpentry Services"
      ],
      features: ["Quick Service", "Exclusive Coupon Code"],
      color: "diamond",
      bgGradient: "bg-gradient-to-r from-blue-400 to-blue-600"
    }
  ];

  const handleSelectMembership = useCallback((membership: Membership) => {
    console.log("Selected membership:", membership);
    // In a real app, you would navigate to payment or show membership signup form
  }, []);

  return { memberships, handleSelectMembership };
}
