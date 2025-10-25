import { formatPrice } from '@/components/ProductCard';

export default function OrderConfirmationPage({ searchParams }: { searchParams: { orderId?: string; total?: string } }) {
  const total = Number(searchParams.total ?? 0);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Thank you for your order</h1>
      <p className="text-gray-700">Your confirmation number is <span className="font-mono">{searchParams.orderId}</span>.</p>
      <p className="text-gray-700">Total charged: {formatPrice(total)}</p>
    </div>
  );
}
