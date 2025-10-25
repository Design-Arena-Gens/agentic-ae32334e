import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/products';

export async function POST(request: Request) {
  const form = await request.formData();
  const order = {
    firstName: String(form.get('firstName') ?? ''),
    lastName: String(form.get('lastName') ?? ''),
    email: String(form.get('email') ?? ''),
    address: String(form.get('address') ?? ''),
    city: String(form.get('city') ?? ''),
    postalCode: String(form.get('postalCode') ?? ''),
  };

  const cookieStore = cookies();
  let cart: Record<string, number> = {};
  const raw = cookieStore.get('cart');
  if (raw) {
    try { cart = JSON.parse(raw.value); } catch {}
  }

  const products = getAllProducts();
  const lineItems = products.filter((p) => cart[p.id]).map((p) => ({ id: p.id, name: p.name, quantity: cart[p.id]!, amount: p.price }));
  const total = lineItems.reduce((sum, i) => sum + i.amount * i.quantity, 0);

  const confirmationId = 'ord_' + Math.random().toString(36).slice(2, 10);
  const response = NextResponse.redirect(`/order-confirmation?orderId=${confirmationId}&total=${total}`, { status: 303 });
  response.cookies.set('cart', JSON.stringify({}), { path: '/', httpOnly: false, sameSite: 'lax' });
  return response;
}
