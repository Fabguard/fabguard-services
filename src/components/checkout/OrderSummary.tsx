
interface OrderSummaryProps {
  total: number;
  discount: number;
}

const OrderSummary = ({ total, discount }: OrderSummaryProps) => {
  const finalTotal = total - discount;

  return (
    <div className="border-t pt-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{total}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            ₹{finalTotal}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          💰 Payment: Cash on Delivery
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
