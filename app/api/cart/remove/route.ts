import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const productId = String(form.get('productId'));

  const cookieStore = cookies();
  let cart: Record<string, number> = {};
  const raw = cookieStore.get('cart');
  if (raw) {
    try { cart = JSON.parse(raw.value); } catch {}
  }
  delete cart[productId];

  const response = NextResponse.redirect('/cart', { status: 303 });
  response.cookies.set('cart', JSON.stringify(cart), { path: '/', httpOnly: false, sameSite: 'lax' });
  return response;
}
