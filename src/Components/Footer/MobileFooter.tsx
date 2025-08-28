import { Link } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  User,

} from 'lucide-react';

const MobileFooter = () => {
  

  return (
    <>
      {/* Mobile Navigation Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-2">
          <Link 
            to="/" 
            className="flex flex-col items-center space-y-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link 
            to="/products" 
            className="flex flex-col items-center space-y-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">Products</span>
          </Link>
          
          <Link 
            to="/wishlist" 
            className="flex flex-col items-center space-y-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs">Wishlist</span>
          </Link>
          
          <Link 
            to="" 
            className="flex flex-col items-center space-y-1 p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>

    
    
    </>
  );
};

export default MobileFooter;
