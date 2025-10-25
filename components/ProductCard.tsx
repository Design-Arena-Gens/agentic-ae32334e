import Image from 'next/image';
import Link from 'next/link';

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number; // cents
  currency: 'USD';
  image: string;
  description: string;
  category: string;
};

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group rounded-lg border overflow-hidden bg-white hover:shadow-md transition">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square w-full bg-gray-100">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-medium leading-tight group-hover:text-brand-700">{product.name}</h3>
            <span className="text-sm text-gray-700">{formatPrice(product.price)}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
        </div>
      </Link>
    </div>
  );
}
