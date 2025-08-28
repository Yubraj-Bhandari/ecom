

import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import {type CartItem,type Cart } from '../types';

const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip Code is required'),
  paymentMethod: z.enum(['cash', 'card'], {
    message: 'Payment method is required',
  }),
  
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === 'card') {
    if (!data.cardNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Card Number is required',
        path: ['cardNumber'],
      });
    }
    if (!data.expiryDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Expiry Date is required',
        path: ['expiryDate'],
      });
    }
    if (!data.cvv) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'CVV is required',
        path: ['cvv'],
      });
    }
  }
});

type CheckoutFormInputs = z.infer<typeof checkoutSchema>;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const { cart, totalPrice } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, 
  } = useForm<CheckoutFormInputs>({
    resolver: zodResolver(checkoutSchema),
  });

  const selectedPaymentMethod = watch('paymentMethod'); 

  const onSubmit: SubmitHandler<CheckoutFormInputs> = (data) => {
    if (!cart) return;

   
    const confirmMessage = `Are you sure you want to place this order?\n\nTotal: $${totalPrice.toFixed(2)}\nPayment Method: ${data.paymentMethod === 'cash' ? 'Cash' : 'Card'}`;
    
    if (!window.confirm(confirmMessage)) {
      return; 
    }

    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      shippingAddress: {
        name: data.name,
        address: data.address,
        state: data.state,
        zipCode: data.zipCode,
      },
      paymentMethod: data.paymentMethod,
      items: cart.products.map((item: CartItem) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    const emptyCart: Cart = {
      id: 0,
      userId: 0,
      products: [],
      total: 0,
      discountedTotal: 0,
      totalProducts: 0,
      totalQuantity: 0,
    };
    dispatch({ type: 'SET_CART', payload: emptyCart });
    
    //  success message
    alert('Order placed successfully!');
    navigate('/orders');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 p-6 max-w-2xl mx-auto"> 
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register('address')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className="md:flex md:gap-4">
              <div className="md:w-1/2"> 
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  {...register('state')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div className="md:w-1/2"> 
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  {...register('zipCode')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-6">
              Payment Method
            </h2>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0"> {/* Improved payment method layout */}
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="cash"
                  {...register('paymentMethod')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Cash</span>
              </label>
              <label className="inline-flex items-center"> 
                <input
                  type="radio"
                  value="card"
                  {...register('paymentMethod')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Card</span>
              </label>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {selectedPaymentMethod === 'card' && (
              <div className="space-y-4 mt-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    {...register('cardNumber')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>
                <div className="md:flex md:gap-4">
                  <div className="md:w-1/2">
                    <label
                      htmlFor="expiryDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      {...register('expiryDate')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                  <div className="md:w-1/2">
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      {...register('cvv')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className=" bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Place Order
            </button>
          </form>
        </div>

        <div className="lg:w-1/3 p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 h-40 overflow-y-auto pr-2">
            {cart?.products.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between items-center">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
          ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;