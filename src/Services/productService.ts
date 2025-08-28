import axios from 'axios';
import type { Product } from '../types';

//define the base url of the api
const API_BASE_URL = 'https://dummyjson.com';

//response interface for products list
export interface ProductsResponse {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
}

//define async function to get products with pagination
export const getProducts = async (limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
  try {
    //send a get request to the products endpoint
    const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`);
    const { products, total, limit: resLimit, skip: resSkip } = response.data;

    //map the api response to the product interface
    const mappedProducts: Product[] = products.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      discountPercentage: item.discountPercentage,
      rating: item.rating,
      stock: item.stock,
      brand: item.brand,
      category: item.category,
      thumbnail: item.thumbnail,
      images: item.images,
      inStock: item.availabilityStatus === 'In Stock',
      reviews: item.reviews,
    }));

    return {
      products: mappedProducts,
      total,
      limit: resLimit,
      skip: resSkip,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

//define async function to get a single product by id
export const getProductById = async (id: number): Promise<Product> => {
  try {
    //send a get request to the specific product endpoint
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    const item = response.data;
    //returns products ko data as a response
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      discountPercentage: item.discountPercentage,
      rating: item.rating,
      stock: item.stock,
      brand: item.brand,
      category: item.category,
      thumbnail: item.thumbnail,
      images: item.images,
      inStock: item.availabilityStatus === 'In Stock',
      reviews: item.reviews,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

//define async function to get product categories
export const getCategories = async (): Promise<string[]> => {
  try {
    //get request to to fetch product categories endpoint
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
   //return the array of category slugs
    return response.data.map((category: { slug: string; name: string; url: string }) => category.slug);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

//defines async function to get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    //send a get request to the category specific endpoint
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    const { products } = response.data;
    //map the api response to the product interface
    return products.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        discountPercentage: item.discountPercentage,
        rating: item.rating,
        stock: item.stock,
        brand: item.brand,
        category: item.category,
        thumbnail: item.thumbnail,
        images: item.images,
        inStock: item.availabilityStatus === 'In Stock',
        reviews: item.reviews,
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

//define async function to search products
export const searchProducts = async (query: string, limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
    const { products, total, limit: resLimit, skip: resSkip } = response.data;

    const mappedProducts: Product[] = products.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      discountPercentage: item.discountPercentage,
      rating: item.rating,
      stock: item.stock,
      brand: item.brand,
      category: item.category,
      thumbnail: item.thumbnail,
      images: item.images,
      inStock: item.availabilityStatus === 'In Stock',
      reviews: item.reviews,
    }));

    return {
      products: mappedProducts,
      total,
      limit: resLimit,
      skip: resSkip,
    };
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};