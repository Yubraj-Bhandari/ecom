//global state management for products, products ko state lai global garayera
//we use it where it is needed
//handles the loading states, error and data of the products
import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { Product } from "../types";

// Define the shape of our product state, products ko data structure, dummy json bata paune data(structure) jastai , as in index.ts
type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

// Define all possible actions, Products ma huney operations
type ProductAction =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "UPDATE_PRODUCT"; payload: Product }
  | { type: "DELETE_PRODUCT"; payload: number };

// Reducer function to handle product state updates (yo chai pure reducer function ho , cause side effects(data fetching or api call) haru chaina)
// return the same output for a given input. The input to a reducer is an action object and the current state of the application. The output is a new state object.
//All side effects (API calls, localStorage, etc.) should happen outside the reducer
const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Create React Context(state + dispatch function) for product state management
const ProductContext = createContext<
  | {
      state: ProductState;
      dispatch: React.Dispatch<ProductAction>;
    }
  | undefined
>(undefined);

// ProductProvider component to provide product functionality
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    loading: false,
    error: null,
  });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {/* children components ley product context(state ra dispatch) access garna milxa */}
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook(useProductContext) to access product context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider");
  }
  return context;
};
