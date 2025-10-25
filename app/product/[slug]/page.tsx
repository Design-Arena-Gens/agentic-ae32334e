import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/lib/products';
import { formatPrice } from '@/components/ProductCard';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-gray-100">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-xl">{formatPrice(product.price)}</p>
        </div>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
        <form action="/api/cart/add" method="post" className="space-y-3">
          <input type="hidden" name="productId" value={product.id} />
          <label className="block">
            <span className="text-sm text-gray-700">Quantity</span>
            <input name="quantity" type="number" min={1} defaultValue={1} className="mt-1 w-24 rounded-md border px-3 py-2" />
          </label>
          <button className="btn-primary" type="submit">Add to cart</button>
        </form>
      </div>
    </div>
  );
}
