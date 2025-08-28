import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; //React Query ho hooks (useQuery, useMutation, useQueryClient).
import { getProducts, getProductsByCategory, getProductById, searchProducts } from '../Services/productService';
import type { Product } from '../types';

// Query keys for React Query (result lai cache garna)
export const productKeys = {
  //Keys are hierarchical: "products" → "products","list" → "products","list",{filters}
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: { limit?: number; offset?: number; category?: string; query?: string; skip?: number }) => 
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

// Hook to get all products (call api to fetch products)
export const useProducts = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: productKeys.list({ limit, offset }),
    queryFn: () => getProducts(limit, offset),
    staleTime: 1000 * 60 * 5, // 5 minutes samma data fresh hunxa
  });
};

// Hook to get featured products
export const useFeaturedProducts = (limit: number = 6) => {
  return useQuery({
    queryKey: productKeys.list({ limit }),
    queryFn: async () => {
      const { products } = await getProducts(limit, 0);
      return products;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Hook to get products by category
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: productKeys.list({ category }),
    queryFn: () => getProductsByCategory(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!category && category !== 'all',
  });
};

// Hook to get a single product
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!id,
  });
};

// Hook for product mutations (create, update, delete)
export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const createProduct = useMutation({
    mutationFn: (newProduct: Omit<Product, 'id'>) => {
      // Replace with actual API call
      return Promise.resolve({ ...newProduct, id: Date.now() });
    },
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });

  const updateProduct = useMutation({
    mutationFn: (updatedProduct: Product) => {
      // Replace with actual API call
      return Promise.resolve(updatedProduct);
    },
    onSuccess: (updatedProduct) => {
      // Update the product in cache
      queryClient.setQueryData(productKeys.detail(updatedProduct.id), updatedProduct);
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: number) => {
      // Replace with actual API call
      return Promise.resolve(id);
    },
    onSuccess: (id) => {
      // Remove product from cache
      queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

// Hook to search products
export const useSearchProducts = (query: string, limit: number = 20, skip: number = 0) => {
  return useQuery({
    queryKey: productKeys.list({ query, limit, skip }),
    queryFn: () => searchProducts(query, limit, skip),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!query, // Only run the query if a query string is provided
  });
};