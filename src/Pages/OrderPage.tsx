import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
  total: number;
};

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white shadow-lg rounded-lg">
          <p className="text-xl text-gray-700 mb-4">You haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 text-lg font-semibold transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Order #{order.id}</h2>
                  <p className="text-gray-600">{formatDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">Total: ${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    Payment: {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                  </p>
                </div>
              </div>
              
              <div className="mb-4 border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">Shipping Address:</h3>
                <div className="space-y-1 text-gray-700"> {/* Added text-gray-700 */}
                  <p><span className="font-semibold">Name:</span> {order.shippingAddress.name}</p>
                  <p><span className="font-semibold">Address:</span> {order.shippingAddress.address}</p>
                  <p><span className="font-semibold">City:</span> {order.shippingAddress.city}</p>
                  <p><span className="font-semibold">State:</span> {order.shippingAddress.state}</p>
                  <p><span className="font-semibold">Zip Code:</span> {order.shippingAddress.zip}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">Items:</h3>
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-2 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;