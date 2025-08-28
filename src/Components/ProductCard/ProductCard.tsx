//individual product display with add to cart feature

import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartMutations } from '../../hooks/useCart';
import StarRating from '../ui/StarRating'; 

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartMutations();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart.mutate({
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.title,
        image: product.thumbnail,
        title: product.title
      });
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    //  wishlist logic here
    console.log('Added to wishlist');
  };

  return (
    <Link to={`/products/${product.id}`} className="block h-full no-underline text-current">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-30 sm:h-40 md:h-48 object-contain bg-red-100  "
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistClick}
                className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full bg-white/80 hover:bg-red-400"
              >
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className=" flex-1">
          <div >
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>
          
          <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
            {product.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed ">
            {product.description}
          </p>
          
          {/* Star Rating */}
          {product.rating && product.rating > 0 && (
            <div className="">
              <StarRating rating={product.rating} />
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-base sm:text-lg font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            <span className={`text-xs px-2  rounded-full ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="px-3 sm:px-4 pb-2 sm:pb-3 pt-0 mt-auto">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || addToCart.isPending}
            className="w-full text-sm"
            size="sm"
          >
            {addToCart.isPending ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                Adding...
              </>
            ) : !product.inStock ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;