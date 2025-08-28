// Import the Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

// Import icons from the lucide-react library for social media and other features
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart,

} from 'lucide-react';






// Define the Footer functional component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Footer Grid - Vertical on mobile, horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="text-xl sm:text-2xl font-bold text-white">EcomStore</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Your trusted destination for quality products. We bring you the best selection with exceptional service and fast delivery.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 pt-4">
              <a 
                href="" 
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="" 
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="" 
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="" 
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="" 
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-gray-800"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link 
                  to="" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">
                    123 Commerce Street<br />
                    Business District, BD 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a 
                  href="" 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <a 
                  href="" 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  support@ecomstore.com
                </a>
              </div>
            </div>
          </div>
        </div>

      
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-400 text-center sm:text-left">
              <p>&copy; 2024 EcomStore. All rights reserved.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <Link 
                to="" 
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="" 
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="" 
                className="hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export
export default Footer;
