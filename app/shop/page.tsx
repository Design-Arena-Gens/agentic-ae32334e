import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/products';

export const dynamic = 'force-static';

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
