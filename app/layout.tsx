import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'MET Clone — Merch Store',
  description: 'A museum-inspired storefront with cart and checkout.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container-default flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              MET
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/shop" className="hover:text-brand-700">Shop</Link>
              <Link href="/cart" className="hover:text-brand-700">Cart</Link>
            </nav>
          </div>
        </header>
        <main className="container-default py-8">{children}</main>
        <footer className="mt-16 border-t">
          <div className="container-default py-8 text-sm text-gray-600">
            © {new Date().getFullYear()} MET Clone. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
