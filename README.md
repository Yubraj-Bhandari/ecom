Project Folder Structure
src/
├── assets/         # static images for ads/banners
├── components/     # reusable UI pieces (Header, ProductCard, Slider, etc.)
├── contexts/       # global state (Auth, Cart, Wishlist, Product)
├── pages/          # big screens (HomePage, ProductListing, Login, Checkout)
├── services/       # API communication (authService, productService, cartService)
├── types/          # TS interfaces so we know shape of data
├── utils/          # schemas, helpers, constants
├── App.tsx         # root app with routing
├── index.tsx       # entry point, wraps providers
├── index.css       # Tailwind CSS imports
