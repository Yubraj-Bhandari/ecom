# 🚀 **React Query Implementation Guide for EcomStore**

## 📋 **Overview**

This guide explains how **React Query (TanStack Query)** has been implemented in your ecom project to replace traditional `useState` and `useEffect` patterns with powerful data fetching, caching, and state management.

---

## 🎯 **What React Query Provides**

### **Key Benefits:**
- ✅ **Automatic Caching** - Data is cached and shared across components
- ✅ **Background Updates** - Data stays fresh automatically
- ✅ **Error Handling** - Built-in error states and retry logic
- ✅ **Loading States** - Automatic loading indicators
- ✅ **Optimistic Updates** - Immediate UI updates with rollback on failure
- ✅ **Request Deduplication** - Multiple components requesting same data share one request
- ✅ **Offline Support** - Cached data available offline

---

## 🏗️ **Implementation Structure**

### **1. Query Client Setup** - `src/main.tsx`
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
```

**Configuration Explained:**
- **`staleTime`**: How long data is considered fresh (5 minutes)
- **`gcTime`**: How long inactive data stays in cache (10 minutes)
- **`retry`**: Number of retry attempts on failure
- **`refetchOnWindowFocus`**: Disabled to prevent unnecessary refetches

---

## 🪝 **Custom Hooks Created**

### **2. Products Hook** - `src/hooks/useProducts.ts`

#### **Query Keys Structure:**
```tsx
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: { limit?: number; offset?: number; category?: string }) => 
    [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};
```

#### **Available Hooks:**
```tsx
// Get all products
const { data, isLoading, error } = useProducts(20, 0);

// Get featured products
const { data: featuredProducts } = useFeaturedProducts(6);

// Get products by category
const { data: categoryProducts } = useProductsByCategory('electronics');

// Get single product
const { data: product } = useProduct(123);
```

#### **Mutation Hooks:**
```tsx
const { createProduct, updateProduct, deleteProduct } = useProductMutations();

// Create product
createProduct.mutate(newProduct);

// Update product
updateProduct.mutate(updatedProduct);

// Delete product
deleteProduct.mutate(productId);
```

### **3. Categories Hook** - `src/hooks/useCategories.ts`

```tsx
// Get all categories
const { data: categories, isLoading, error } = useCategories();

// Category mutations
const { createCategory, deleteCategory } = useCategoryMutations();
```

### **4. Cart Hook** - `src/hooks/useCart.ts`

```tsx
// Cart mutations
const { addToCart, removeFromCart, updateQuantity, clearCart } = useCartMutations();

// Cart data
const { items, count, total } = useCartData();
```

---

## 🔄 **How It Replaces Traditional Patterns**

### **Before (useState + useEffect):**
```tsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  fetchProducts();
}, []);
```

### **After (React Query):**
```tsx
const { data: products, isLoading, error } = useProducts();
```

**Benefits:**
- ✅ **No manual state management**
- ✅ **Automatic loading/error states**
- ✅ **Built-in caching**
- ✅ **Background refetching**
- ✅ **Request deduplication**

---

## 📱 **Component Updates**

### **1. FeaturedProducts Component**
```tsx
// Before
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchFeaturedProducts = async () => {
    try {
      const data = await getProductsByLimit(6);
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchFeaturedProducts();
}, []);

// After
const { data: products, isLoading, error } = useFeaturedProducts(6);
```

### **2. ProductsPage Component**
```tsx
// Before
const { state: { products }, dispatch } = useProductContext();
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (selectedCategory === 'all') {
        const data = await getProducts(20, 0);
        dispatch({ type: 'SET_PRODUCTS', payload: data.products });
      } else {
        const data = await getProductsByCategory(selectedCategory);
        dispatch({ type: 'SET_PRODUCTS', payload: data });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, [selectedCategory, dispatch]);

// After
const allProductsQuery = useProducts(20, 0);
const categoryProductsQuery = useProductsByCategory(selectedCategory);

const isCategoryQuery = selectedCategory !== 'all';
const { data: productsData, isLoading, error } = isCategoryQuery ? categoryProductsQuery : allProductsQuery;
```

### **3. CategoryFilter Component**
```tsx
// Before
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchCategories();
}, []);

// After
const { data: categories, isLoading, error } = useCategories();
```

---

## 🎨 **Enhanced User Experience**

### **1. Loading States**
```tsx
if (isLoading) {
  return (
    <div className="animate-pulse">
      {/* Skeleton loading UI */}
    </div>
  );
}
```

### **2. Error Handling**
```tsx
if (error) {
  return (
    <div className="text-center py-8">
      <p className="text-red-600 mb-4">Error loading products</p>
      <Button onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  );
}
```

### **3. Mutation States**
```tsx
const { addToCart } = useCartMutations();

<Button 
  onClick={handleAddToCart}
  disabled={!product.inStock || addToCart.isPending}
>
  {addToCart.isPending ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      Adding...
    </>
  ) : (
    <>
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </>
  )}
</Button>
```

---

## 🔧 **Advanced Features**

### **1. Query Invalidation**
```tsx
const queryClient = useQueryClient();

// Invalidate specific queries
queryClient.invalidateQueries({ queryKey: productKeys.lists() });

// Invalidate all product queries
queryClient.invalidateQueries({ queryKey: productKeys.all });
```

### **2. Optimistic Updates**
```tsx
const updateProduct = useMutation({
  mutationFn: updateProductAPI,
  onMutate: async (newProduct) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: productKeys.detail(newProduct.id) });
    
    // Snapshot previous value
    const previousProduct = queryClient.getQueryData(productKeys.detail(newProduct.id));
    
    // Optimistically update
    queryClient.setQueryData(productKeys.detail(newProduct.id), newProduct);
    
    return { previousProduct };
  },
  onError: (err, newProduct, context) => {
    // Rollback on error
    queryClient.setQueryData(productKeys.detail(newProduct.id), context?.previousProduct);
  },
  onSettled: () => {
    // Always refetch after error or success
    queryClient.invalidateQueries({ queryKey: productKeys.detail(newProduct.id) });
  },
});
```

### **3. Dependent Queries**
```tsx
const { data: user } = useUser(userId);
const { data: userProducts } = useUserProducts(userId, {
  enabled: !!userId, // Only run when user exists
});
```

---

## 📊 **Performance Benefits**

### **1. Automatic Caching**
- Data is cached for 5 minutes (staleTime)
- Multiple components share the same cached data
- No unnecessary API calls

### **2. Background Updates**
- Data refreshes automatically in background
- UI stays responsive during updates
- Users see fresh data without manual refresh

### **3. Request Deduplication**
- Multiple components requesting same data
- Only one API call is made
- All components receive the same response

### **4. Smart Refetching**
- Refetches on window focus (disabled in our config)
- Refetches on network reconnection
- Refetches when component remounts

---

## 🚀 **How to Use in New Components**

### **1. Create a Custom Hook:**
```tsx
// src/hooks/useSearchProducts.ts
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: productKeys.list({ search: query }),
    queryFn: () => searchProducts(query),
    enabled: query.length > 2, // Only search when query is long enough
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
  });
};
```

### **2. Use in Component:**
```tsx
const SearchResults = ({ query }: { query: string }) => {
  const { data: products, isLoading, error } = useSearchProducts(query);

  if (isLoading) return <div>Searching...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

---

## 🎉 **Result: Modern Data Management!**

Your ecom application now uses **React Query** for:

- ✅ **Automatic data caching and synchronization**
- ✅ **Built-in loading and error states**
- ✅ **Optimistic updates for better UX**
- ✅ **Background data refreshing**
- ✅ **Request deduplication**
- ✅ **Smart error handling and retries**
- ✅ **Offline data availability**

The app is now more performant, user-friendly, and maintainable! 🚀

---

## 🔍 **Testing React Query**

### **1. Check Network Tab:**
- Open DevTools → Network
- Navigate between pages
- Notice fewer duplicate requests

### **2. Test Caching:**
- Visit a page, then go back
- Data loads instantly (from cache)
- No loading spinners on cached data

### **3. Test Error Handling:**
- Disconnect internet
- Try to load products
- See proper error states

### **4. Test Mutations:**
- Add items to cart
- Notice optimistic updates
- See loading states during mutations

