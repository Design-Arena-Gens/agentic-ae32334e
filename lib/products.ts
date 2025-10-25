import products from '../data/products.json';
import type { Product } from '@/components/ProductCard';

export function getAllProducts(): Product[] {
  return products as unknown as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}
