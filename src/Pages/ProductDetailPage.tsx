import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCartMutations } from '../hooks/useCart';
import StarRating from '../Components/ui/StarRating'; 

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(Number(id));
  const { addToCart } = useCartMutations();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const handleAddToCart = () => {
  if (product && product.stock !== undefined && product.stock > 0) {
      addToCart.mutate({
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.title,
        image: product.thumbnail,
      });
      navigate('/cart');
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="md:w-1/2 ">
          <div className="mb-4">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="w-full h-auto object-contain rounded-lg shadow-lg bg-red-100"
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className="flex gap-2">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 shadow-lg ${
                  (selectedImage || product.thumbnail) === image ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            <StarRating rating={product.rating || 0} />
            <span className="text-gray-600 ml-2">({product.rating?.toFixed(1)})</span>
          </div>

          <p className="text-gray-700 text-base mb-6">{product.description}</p>

          <div className="mb-6">
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-red-600">
                  ${discountedPrice.toFixed(2)}
                </p>
                <p className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </p>
                <span className="text-sm font-semibold text-white bg-red-500 px-2 py-1 rounded-md">
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              </div>
            ) : (
              <p className="text-3xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Stock:</span> {product.stock} available
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={` px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${
              product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Reviews Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <StarRating rating={review.rating} />
                      <span className="text-gray-600 ml-2 font-semibold">{review.reviewerName}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews for this product yet.</p>
            )}
          </div>
        </div>
          <div>
            

          </div>
        </div>
      </div>
  )
    
};

export default ProductDetailPage;