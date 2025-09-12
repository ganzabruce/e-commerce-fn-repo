export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCategory = 
  | 'Electronics'
  | 'Footwear'
  | 'Clothing'
  | 'Home & Kitchen'
  | 'Books'
  | 'Sports & Fitness'
  | 'Food & Beverages'
  | 'Furniture'
  | 'Games & Toys'
  | 'Health & Wellness'
  | 'Home & Garden'
  | 'Accessories';

export interface ProductFormData {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  quantity: number;
}

export interface StockStatus {
  text: string;
  color: string;
}

export interface ProductContextType {
  products: Product[];
  addProduct: (product: ProductFormData) => void;
  updateProduct: (id: string, product: ProductFormData) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}