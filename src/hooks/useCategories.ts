import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories } from '../Services/productService';

// Query keys for categories
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: () => [...categoryKeys.lists()] as const,
};

// Hook to get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Hook for category mutations
export const useCategoryMutations = () => {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (newCategory: string) => {
      // Replace with actual API call
      return Promise.resolve(newCategory);
    },
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (category: string) => {
      // Replace with actual API call
      return Promise.resolve(category);
    },
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
  });

  return {
    createCategory,
    deleteCategory,
  };
};
