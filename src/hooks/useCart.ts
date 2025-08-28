import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCart as useCartContext } from '../Context/CartContext';
import type { Cart } from '../types';

// Query keys for cart
export const cartKeys = {
  all: ['cart'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
  count: () => [...cartKeys.all, 'count'] as const,
};

// Hook for cart mutations
export const useCartMutations = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useCartContext();

  const addToCart = useMutation({
    mutationFn: ({
      productId,
      quantity,
      price,
      name, 
      image, 
    }: { productId: number; quantity: number; price: number; name: string; image: string }) => {
      
      return Promise.resolve({ productId, quantity, price, name, image });
    },
    onSuccess: (data) => {
      // Update local cart state
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...data,
          id: Date.now(), // Generate a unique ID
        },
      });
      
      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: cartKeys.items() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });

  const removeFromCart = useMutation({
    mutationFn: (productId: number) => {
      // This would typically be an API call
      return Promise.resolve(productId);
    },
    onSuccess: (productId) => {
      // Update local cart state
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: productId,
      });
      
      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: cartKeys.items() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => {
      // This would typically be an API call
      return Promise.resolve({ productId, quantity });
    },
    onSuccess: (data) => {
      // Update local cart state
      dispatch({
        type: 'UPDATE_QTY',
        payload: data,
      });
      
      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: cartKeys.items() });
      queryClient.invalidateQueries({ queryKey: cartKeys.count() });
    },
  });

  const clearCart = useMutation({
    mutationFn: () => {
      // This would typically be an API call
      return Promise.resolve();
    },
    onSuccess: () => {
      // Update local cart state
      const emptyCart: Cart = {
        id: 0,
        userId: 0,
        products: [],
        total: 0,
        discountedTotal: 0,
        totalProducts: 0,
        totalQuantity: 0,
      };
      dispatch({
        type: 'SET_CART',
        payload: emptyCart,
      });
      
      // Invalidate cart queries
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });

  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};

// Hook to get cart data
export const useCartData = () => {
  const { state } = useCartContext();
  return {
    items: state.cart.products,
    count: state.cart.products.length,
    total: state.cart.products.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  };
};