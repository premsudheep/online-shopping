export interface Product {
  title?: string | undefined;
  price?: number;
  category?: string;
  imageURL?: string;
}

export interface ProductState {
  productId?: string | null;
  product?: Product;
}
