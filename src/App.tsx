import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider, ProductProvider } from "./Context";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import LoginPage from "./Pages/LoginPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderPage from "./Pages/OrderPage";
import "./App.css";

//functional component
function AppShell() {
  const location = useLocation(); //react router hook , gives current url
  const isAuthRoute = location.pathname === "/login"; //check iff current route is "/login"
  //login page bhaye header ra footer hide garna ko lagi

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* login route ma bhaye header hide garne */}
      {!isAuthRoute && <Header />}
      <main
        className={`flex-1 ${
          !isAuthRoute ? "max-w-7xl mx-auto py-4 sm:py-6 w-full" : "w-full"
        }`}
      >
        <Routes>
          {/* public route for login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* protected routes haru,wrapped inside Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderPage />} />
          </Route>
        </Routes>
      </main>
      {/* login page ma bhaye footer hide garne */}
      {!isAuthRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    // enable client side routing
    <Router basename="/ecom/">
      {/* product ra cart ko state/context app lai diney */}
      <ProductProvider>
        <CartProvider>
          <AppShell />
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
