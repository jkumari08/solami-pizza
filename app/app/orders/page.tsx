'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOrders, Order } from '@/src/util/inventory';
import { LoveableOrderCard } from '@/src/components/LoveableOrderCard';
import Link from 'next/link';
import { Footer } from '@/src/components/Footer';
import { ConnectWallet } from '@/src/components/ConnectWallet';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      setOrders(getOrders());
      setIsLoaded(true);
    };
    loadOrders();
  }, []);

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black">
        <nav className="border-b border-purple-500/20 bg-gradient-to-r from-slate-900 to-slate-800/50 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <span className="text-2xl">🍕</span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Solami Pizza
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
              <Link href="/menu" className="text-gray-400 hover:text-white transition">Menu</Link>
              <Link href="/deals" className="text-gray-400 hover:text-white transition">Deals</Link>
              <Link href="/orders" className="text-purple-400 hover:text-purple-300 transition">Orders</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
              <Link href="/cart" className="relative text-gray-400 hover:text-white transition text-xl">
                🛒
              </Link>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold hover:from-purple-700 hover:to-cyan-700 transition">
                DYw8jCTf...NSKK
              </button>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-xl pt-20">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black">
      {/* Navigation Bar */}
      <nav className="border-b border-purple-500/20 bg-gradient-to-r from-slate-900 to-slate-800/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <span className="text-2xl">🍕</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Solami Pizza
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
            <Link href="/menu" className="text-gray-400 hover:text-white transition">Menu</Link>
            <Link href="/deals" className="text-gray-400 hover:text-white transition">Deals</Link>
            <Link href="/orders" className="text-purple-400 hover:text-purple-300 transition">Orders</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
            <Link href="/cart" className="relative text-gray-400 hover:text-white transition text-xl">
              🛒
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 pt-8 pb-16">
        <h1 className="text-5xl font-bold text-white mb-4">
          <span className="text-4xl">📋</span> Order History
        </h1>
        <p className="text-gray-400 text-lg mb-12">View all your pizza orders and transactions</p>

        {orders.length === 0 ? (
          <div className="text-center py-20 rounded-xl bg-slate-800/50 border border-purple-500/20">
            <p className="text-2xl text-gray-400 mb-6">No orders yet</p>
            <p className="text-gray-500 mb-8">Start ordering your favorite pizzas now!</p>
            <Link
              href="/menu"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all"
            >
              Browse Menu 🍕
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <LoveableOrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-12 pt-12 border-t border-purple-500/20">
            <Link
              href="/menu"
              className="inline-block px-6 py-3 border border-purple-500/30 text-white font-medium rounded-xl hover:border-purple-500/60 hover:bg-purple-500/10 transition-all"
            >
              ← Back to Menu
            </Link>
          </div>
        )}
      </div>
    </main>
    <Footer />
    </>
  );
}
