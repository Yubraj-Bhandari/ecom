import React from 'react';
import { useCartData, useCartMutations } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';


const CartPage: React.FC = () => {
  const { items, total } = useCartData();
  const { removeFromCart, updateQuantity, clearCart } = useCartMutations();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
      {
        items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b py-2">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity.mutate({ productId: item.productId, quantity: parseInt(e.target.value) })}
                    className="w-16 text-center border rounded mr-2"
                  />
                  <button
                    onClick={() => removeFromCart.mutate(item.productId)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => clearCart.mutate()}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CartPage;