export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  gallery: any
}

export interface ProductResponse {
  data: Product[];
  links: any;
  meta: any;
}