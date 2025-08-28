import axios from './axios';
import {type Cart } from '../types';

const API_BASE_URL = 'https://dummyjson.com';

export const getCart = async (userId: number): Promise<Cart> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carts/user/${userId}`);
    return response.data.carts[0] || { id: 0, products: [], total: 0, discountedTotal: 0, userId: userId, totalProducts: 0, totalQuantity: 0 };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { id: 0, products: [], total: 0, discountedTotal: 0, userId: userId, totalProducts: 0, totalQuantity: 0 };
  }
};

export const updateCart = async (cart: Cart): Promise<Cart> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/carts/${cart.id}`, {
      userId: cart.userId,
      products: cart.products.map(item => ({
        id: item.id,
        quantity: item.quantity,
      })),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};