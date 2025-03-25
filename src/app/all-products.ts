import { ProductInfo } from './product-info';

export interface AllProducts {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: ProductInfo[];
}
