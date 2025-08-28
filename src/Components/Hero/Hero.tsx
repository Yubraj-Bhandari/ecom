import { Button } from '../ui/button';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Amazing
              <span className="block text-yellow-300 mt-2">Products</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-lg mx-auto lg:mx-0">
              Shop the latest trends with our curated collection of high-quality products. 
              Fast shipping, secure payments, and excellent customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Shop Now
                </Button>
              </Link>
               <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Learn More
                </Button>
             
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-400 p-2 rounded-full flex-shrink-0">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-800" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base">Premium Quality</h3>
                    <p className="text-xs sm:text-sm text-blue-100">Curated selection</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-400 p-2 rounded-full flex-shrink-0">
                    <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-green-800" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base">Fast Shipping</h3>
                    <p className="text-xs sm:text-sm text-blue-100">Free on orders $50+</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-400 p-2 rounded-full flex-shrink-0">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-800" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base">Secure Payment</h3>
                    <p className="text-xs sm:text-sm text-blue-100">100% protected</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-400 p-2 rounded-full flex-shrink-0">
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-purple-800" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base">Easy Returns</h3>
                    <p className="text-xs sm:text-sm text-blue-100">30-day guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
