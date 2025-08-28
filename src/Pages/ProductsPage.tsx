import { useState, useEffect } from 'react';
import ProductCard from '../Components/ProductCard/ProductCard';
import CategoryFilter from '../Components/CategoryFilter/CategoryFilter';
import { Button } from '../Components/ui/button';
import {  Filter } from 'lucide-react';
import { useProducts, useProductsByCategory, useSearchProducts } from '../hooks/useProducts';
import type { Product } from '../types';
import type { ProductsResponse } from '../Services/productService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select";
import { useLocation } from 'react-router-dom';

//define product page functional component
const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  //state to track selected category
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  // Reset category when search query changes
  useEffect(() => {
    if (searchQuery) {
      setSelectedCategory('all');
    }
  }, [searchQuery]);

  // Use React Query hooks
  const allProductsQuery = useProducts(50, 0);
  const categoryProductsQuery = useProductsByCategory(selectedCategory);
  const searchProductsQuery = useSearchProducts(searchQuery, 50, 0);

  // Determine which query to use based on selected category or search query
  let activeQuery;
  const isSearchQuery = !!searchQuery;
  const isCategoryQuery = selectedCategory !== 'all';

  if (isSearchQuery) {
    activeQuery = searchProductsQuery;
  } else if (isCategoryQuery) {
    activeQuery = categoryProductsQuery;
  } else {
    activeQuery = allProductsQuery;
  }

  const { data: productsData, isLoading, error } = activeQuery;

  // Extract products array from the query response
  let products: Product[] | undefined;

  if (isSearchQuery || (!isSearchQuery && !isCategoryQuery)) {
    products = (productsData as ProductsResponse)?.products;
  } else if (isCategoryQuery) {
    products = productsData as Product[];
  }

  //handler function to update category
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (value: 'none' | 'asc' | 'desc') => {
    setSortOrder(value);
  };

  if (products) {
    if (sortOrder === 'asc') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      products = [...products].sort((a, b) => b.price - a.price);
    }
  }

//loading state
  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{isSearchQuery ? `Searching for "${searchQuery}"` : 'All Products'}</h1>
        </div>
        {/* category filter */}
        {!isSearchQuery && <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />}
      {/* skeleton loading grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-32 sm:h-48 rounded-lg mb-3 sm:mb-4"></div>
              <div className="bg-gray-200 h-3 sm:h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-3 sm:h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
// Error state
  if (error) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">{isSearchQuery ? `Searching for "${searchQuery}"` : 'All Products'}</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error loading products</p>
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline"
            className="w-full sm:w-auto"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
// success state, data 
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{isSearchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}</h1>
      </div>
{/* category filter component */}

      {!isSearchQuery && <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />}
 {/* Info bar: product count + sort button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <p className="text-sm sm:text-base text-gray-600">
          Showing {products?.length || 0} products
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          {isSearchQuery && ` for "${searchQuery}"`}
        </p>
        <Select onValueChange={handleSortChange} defaultValue={sortOrder}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sort by Price</SelectItem>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
{/* No products found state */}
      {!products || products.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-sm sm:text-base text-gray-500">Try selecting a different category or check back later.</p>
        </div>
      ) : (
        //product listing
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* render each product in Product Card Component */}
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
