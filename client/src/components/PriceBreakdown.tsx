interface Props {
  price: number;
  guests: number;
  discount: number;
}

const PriceBreakdown = ({ price, guests, discount }: Props) => {
  const subtotal = price * guests;
  const total = subtotal - discount;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Price Breakdown</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>₹{price} × {guests} guest{guests > 1 ? 's' : ''}</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-semibold">
            <span>Discount</span>
            <span>- ₹{discount.toLocaleString()}</span>
          </div>
        )}
        
        <div className="border-t pt-3 flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
