import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useEffect,
} from "react";
import { type Cart, type CartItem } from "../types"; //Cart ko state manage garnu xa,so Cart ko data structure lyaune(that we get from dummy json) index.ts bata

// Define the shape of our cart state ,cart ko type liyera state banaune
type CartState = {
  cart: Cart; // Use Cart interface (data of cart index.ts ma dummy json bata aaune cart ko data format)
  totalPrice: number;
};

// Define all possible actions , Cart ma hune operations to update cart ko state
type CartAction =
  | { type: "SET_CART"; payload: Cart } // Replace entire cart
  | { type: "ADD_TO_CART"; payload: CartItem } // Add single item
  | { type: "REMOVE_FROM_CART"; payload: number } // Remove by productId
  | { type: "UPDATE_QTY"; payload: { productId: number; quantity: number } }; // Update quantity

// Reducer function to handle cart state updates(how to update cart ko state based on action)
// return the same output for a given input. The input to a reducer is an action object and the current state of the application. The output is a new state object.
//All side effects (API calls, localStorage, etc.) should happen outside the reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART": //replace entire cart
      return {
        ...state, //state lai destructure garne , yesma CartState ra CartAction xa
        cart: action.payload, //set new cart(cause payload ma Cart ko data structure xa)
        totalPrice: action.payload.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
      };
    case "ADD_TO_CART":
      //cart ma add garda, paila check if product paila exist garxa ki gardaina(based on id), if garxa, tesko quantity update garne
      const existingItemIndex = state.cart.products.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex > -1) {
        // Product already exists, update quantity
        const updatedProducts = state.cart.products.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          cart: {
            ...state.cart,
            products: updatedProducts,
            total: updatedProducts.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            ),
            discountedTotal: state.cart.discountedTotal, // Keep existing discountedTotal
            totalProducts: updatedProducts.length,
            totalQuantity: updatedProducts.reduce(
              (acc, item) => acc + item.quantity,
              0
            ),
          },
          totalPrice: updatedProducts.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          ),
        };
      } else {
        // Product does not exist, add new item in cart
        return {
          ...state,
          cart: {
            ...state.cart,
            products: [...state.cart.products, action.payload],
            total:
              state.cart.total + action.payload.quantity * action.payload.price,
            discountedTotal: state.cart.discountedTotal, // Keep existing discountedTotal
            totalProducts: state.cart.products.length + 1,
            totalQuantity: state.cart.totalQuantity + action.payload.quantity,
          },
          totalPrice:
            state.totalPrice + action.payload.quantity * action.payload.price,
        };
      }
    case "REMOVE_FROM_CART":
      const item = state.cart.products.find(
        (i) => i.productId === action.payload
      );
      const filteredProducts = state.cart.products.filter(
        (i) => i.productId !== action.payload
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          products: filteredProducts,
          total: filteredProducts.reduce(
            (acc, p) => acc + p.quantity * p.price,
            0
          ),
          discountedTotal: state.cart.discountedTotal,
          totalProducts: filteredProducts.length,
          totalQuantity: filteredProducts.reduce(
            (acc, p) => acc + p.quantity,
            0
          ),
        },
        totalPrice: state.totalPrice - (item ? item.quantity * item.price : 0),
      };
    case "UPDATE_QTY":
      const updatedProducts = state.cart.products.map((i) =>
        i.productId === action.payload.productId
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          products: updatedProducts,
          total: updatedProducts.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          ),
          discountedTotal: state.cart.discountedTotal,
          totalProducts: updatedProducts.length,
          totalQuantity: updatedProducts.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        },
        totalPrice: updatedProducts.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
      };
    default:
      return state;
  }
};

// Create React Context for cart state management (state + dispatch),  to share data of cart across the components
const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

// CartProvider component to provide cart functionality
export const CartProvider = ({ children }: { children: ReactNode }) => {
  //if local storage ma xa bhane, initial cart load garne
  const initialProducts: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]"
  ) as CartItem[];
  const initialTotalPrice = initialProducts.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const initialTotalProducts = initialProducts.length;
  const initialTotalQuantity = initialProducts.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  //useReducer ley cart ko state manage garxa
  const [state, dispatch] = useReducer(cartReducer, {
    cart: {
      id: 0, // Assuming a default ID for the cart
      userId: 0, // Assuming a default user ID
      products: initialProducts,
      total: initialTotalPrice,
      discountedTotal: 0, // Initialize to 0, update if discount logic is applied
      totalProducts: initialTotalProducts,
      totalQuantity: initialTotalQuantity,
    },
    totalPrice: initialTotalPrice,
  });

  // savev cart ko data to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart.products));
  }, [state.cart.products]);

  //provide cart ko context(state ra dispatch ) to children components
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context, useCart use garera Cart ko context (state) access garna milxa
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
