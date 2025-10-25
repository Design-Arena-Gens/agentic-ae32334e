import { cookies } from 'next/headers';
import Link from 'next/link';
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

export default function CartPage() {
  const cart = getCart();
  const products = getAllProducts();
  const items = products
    .filter((p) => cart[p.id])
    .map((p) => ({ product: p, quantity: cart[p.id]! }));

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty. <Link href="/shop" className="text-brand-700 underline">Browse products</Link>.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">{formatPrice(product.price)} × {quantity}</p>
              </div>
              <form action="/api/cart/remove" method="post">
                <input type="hidden" name="productId" value={product.id} />
                <button className="btn-secondary" type="submit">Remove</button>
              </form>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium">Subtotal</p>
            <p className="text-lg">{formatPrice(subtotal)}</p>
          </div>
          <div>
            <Link href="/checkout" className="btn-primary">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
