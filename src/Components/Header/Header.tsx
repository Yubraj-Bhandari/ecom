
import { ShoppingCart, Search, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCartData } from '../../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout as doLogout } from '../../Services/authService';

//define the header functional component
const Header = () => {
  //extracting count from useCartData hook renaming it as cartItemCount
  const { count: cartItemCount } = useCartData();
  //state to track whether the mobile menu is open or closed 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const navigate = useNavigate();
  const hasToken = typeof window !== 'undefined' ? Boolean(localStorage.getItem('token')) : false;

//function to toggle mobile menu open/close state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      doLogout();
      navigate('/login');
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input after navigating
      setIsMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  return (
    <header className="bg-white shadow-sm border-b relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-slate-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:bg-clip-text hover:text-transparent transition-colors">
              EcomStore
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-10 pl-4 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-end space-x-2 lg:space-x-4 ">
            <Link to="/products">
              <Button variant="ghost" size="sm" className="text-sm cursor-pointer">
                Products
              </Button>
            </Link>
            
            <Link to="/orders">
              <Button variant="ghost" size="sm" className="text-sm cursor-pointer">
                Orders
              </Button>
            </Link>

            <Link to="/cart"> {/*  Link to CartPage */}
              <Button variant="ghost" size="sm" className="relative text-sm cursor-pointer">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {hasToken ? (
              <Button variant="ghost" size="sm" className="text-sm cursor-pointer" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2 " />
                <span className="hidden lg:inline ">Logout</span>
              </Button>
            ) : (
              <Link to="/#">
                <Button variant="ghost" size="sm" className="text-sm">
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden lg:inline">Login</span>
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Search Bar */}
          <div className="md:hidden flex-1 max-w-xs mx-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pr-10 pl-4 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart"> {/* Add Link to CartPage for mobile */}
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/products"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/orders"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
              {hasToken ? (
                <button className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md transition-colors" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 inline mr-2" />
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;