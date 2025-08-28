

import ProductCard from '../ProductCard/ProductCard';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeaturedProducts } from '../../hooks/useProducts';

//defining the featured products component
// using the custom hook to fetch featured products
const FeaturedProducts = () => {
  //aliasing data as products and remaining states as isLoading and error state
  const { data: products, isLoading, error } = useFeaturedProducts(6);

  //if products are still loading
  if (isLoading) {
    return (
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
        </div>
        {/* creating the skeleton loader */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* array of 6 empty slots */}
          {[...Array(6)].map((_, index) => (
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

  //if error state bhaye retry button pani (page refresh garxa)
  if (error) {
    return (
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Error loading featured products</p>
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
  //if data is successfully loaded then we render the products
  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
        <Link to="/products">
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      {/* rendering the product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products?.map((product) => (
        //  each product is passed as a props to the Product Card component, using product id
         <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
