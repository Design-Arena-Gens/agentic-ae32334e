import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">The MET Clone</h1>
        <p className="text-lg text-gray-600">
          Explore a curated selection of museum-inspired merchandise. Thoughtful design, gallery-grade quality.
        </p>
        <div className="flex gap-3">
          <Link href="/shop" className="btn-primary">Shop Collection</Link>
          <Link href="/cart" className="btn-secondary">View Cart</Link>
        </div>
      </div>
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border bg-gray-50"></div>
    </div>
  );
}
