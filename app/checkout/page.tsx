import Link from 'next/link';
import { cookies } from 'next/headers';
import { getAllProducts } from '@/lib/products';
import { formatPrice } from '@/components/ProductCard';

function getCart() {
  const cookieStore = cookies();
  const raw = cookieStore.get('cart');
  try {
    return raw ? (JSON.parse(raw.value) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export default function CheckoutPage() {
  const cart = getCart();
  const products = getAllProducts();
  const items = products.filter((p) => cart[p.id]).map((p) => ({ product: p, quantity: cart[p.id]! }));
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <p>Your cart is empty. <Link href="/shop" className="text-brand-700 underline">Shop for items</Link>.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <form action="/api/checkout" method="post" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm">First name</span>
              <input name="firstName" required className="mt-1 w-full rounded-md border px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm">Last name</span>
              <input name="lastName" required className="mt-1 w-full rounded-md border px-3 py-2" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm">Email</span>
            <input type="email" name="email" required className="mt-1 w-full rounded-md border px-3 py-2" />
          </label>
          <label className="block">
            <span className="text-sm">Address</span>
            <input name="address" required className="mt-1 w-full rounded-md border px-3 py-2" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm">City</span>
              <input name="city" required className="mt-1 w-full rounded-md border px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-sm">Postal code</span>
              <input name="postalCode" required className="mt-1 w-full rounded-md border px-3 py-2" />
            </label>
          </div>
          <button type="submit" className="btn-primary">Place order</button>
        </form>
        <p className="text-sm text-gray-600">Payment is simulated. No charges will be made.</p>
      </div>
      <aside className="space-y-4">
        <h2 className="text-lg font-medium">Order summary</h2>
        <div className="rounded-lg border divide-y">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between p-4">
              <span className="text-sm">{product.name} × {quantity}</span>
              <span className="text-sm">{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between p-4">
            <span className="font-medium">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
