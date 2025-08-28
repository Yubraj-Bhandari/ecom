//shape of data(products,carts,users) that we recieve from DummyJSON (backend) schema jastai



//review ma rating , comment , date ,reviewerName ra reviewerEmail hunxa
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

//Product ma product id , title , description, price , discount price, rating , stock
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images?: string[];
  inStock: boolean;
  reviews?: Review[];
}

export interface User{
    id? :number;
    email:string;
    
    password:string;
    token?:string;
    refreshToken?:string;
    firstName:string;
    lastName:string;
}
export interface CartItem{
  
    title: string | undefined;
    productId:number;
    quantity:number;
    price:number;
    id:number; 
    name:string; 
    image:string; 
}
export interface Cart{
    id:number;
    userId:number;
    products:CartItem[];
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
}
export interface Address{
    street:string;
    city:string;
    zip:string;
}
