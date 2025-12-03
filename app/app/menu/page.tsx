'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { pizzas } from '@/src/data/pizzas';
import { PizzaCard } from '@/src/components/LoveablePizzaCard';
import { Footer } from '@/src/components/Footer';
import { ConnectWallet } from '@/src/components/ConnectWallet';

export default function MenuPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
            <Link href="/menu" className="text-purple-400 hover:text-purple-300 transition">Menu</Link>
            <Link href="/deals" className="text-gray-400 hover:text-white transition">Deals</Link>
            <Link href="/orders" className="text-gray-400 hover:text-white transition">Orders</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
            <Link href="/cart" className="relative text-gray-400 hover:text-white transition text-xl">
              🛒
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 mb-16 pt-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            <span className="text-4xl">🍕</span> Our Menu
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handcrafted pizzas made with the finest ingredients. Customize your perfect slice and pay with Solana.
          </p>
        </div>
      </div>

      {/* Pizza Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzas.map((pizza, index) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={index} />
          ))}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
