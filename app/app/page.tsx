'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { pizzas } from '@/src/data/pizzas';
import { PizzaCard } from '@/src/components/LoveablePizzaCard';
import { Footer } from '@/src/components/Footer';
import { ConnectWallet } from '@/src/components/ConnectWallet';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

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
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍕</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Solami Pizza
            </span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-purple-400 hover:text-purple-300 transition">Home</Link>
            <Link href="/menu" className="text-gray-400 hover:text-white transition">Menu</Link>
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

      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-cyan-400 text-sm font-semibold">Powered by Solana</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Pizza Payments
              </span>
              <span className="text-5xl ml-3">🍕</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Order delicious pizza. Pay with Solana.
              <br />
              <span className="text-white font-bold">Fast. Cheap. Secure.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => router.push('/menu')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 text-lg"
              >
                Start Ordering →
              </button>
              <button
                onClick={() => router.push('/menu')}
                className="px-8 py-4 border-2 border-gray-600 hover:border-purple-500 text-white font-bold rounded-xl transition-all text-lg"
              >
                View Menu
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full mt-12">
              <div className="flex items-center gap-3 text-gray-300 p-6 rounded-lg bg-gray-900/30 backdrop-blur border border-purple-500/20">
                <span className="text-3xl">⚡</span>
                <div className="text-left">
                  <div className="font-bold text-white">Instant Payments</div>
                  <div className="text-sm text-gray-400">Solana Pay</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300 p-6 rounded-lg bg-gray-900/30 backdrop-blur border border-purple-500/20">
                <span className="text-3xl">🔄</span>
                <div className="text-left">
                  <div className="font-bold text-white">Instant Payments</div>
                  <div className="text-sm text-gray-400">USDC on Solana</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300 p-6 rounded-lg bg-gray-900/30 backdrop-blur border border-purple-500/20">
                <span className="text-3xl">🛡️</span>
                <div className="text-left">
                  <div className="font-bold text-white">Devnet Demo</div>
                  <div className="text-sm text-gray-400">No real money</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Order your pizza in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur border border-purple-500/20 hover:border-purple-500/50 transition-all text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🍕</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">01</h3>
              <h4 className="text-xl font-bold text-white mb-3">Choose Your Pizza</h4>
              <p className="text-gray-400">Browse our menu and customize your perfect pizza</p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur border border-purple-500/20 hover:border-purple-500/50 transition-all text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">👛</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">02</h3>
              <h4 className="text-xl font-bold text-white mb-3">Connect Wallet</h4>
              <p className="text-gray-400">Connect your Solana wallet (Phantom, Solanflare, etc.)</p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur border border-purple-500/20 hover:border-purple-500/50 transition-all text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">03</h3>
              <h4 className="text-xl font-bold text-white mb-3">Pay & Enjoy</h4>
              <p className="text-gray-400">Complete payment with USDC and wait for your pizza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Order CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur border border-purple-500/30 text-center">
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Order? 🚀</h2>
            <p className="text-xl text-gray-300 mb-8">Experience the future of pizza payments today. Fast, secure, and delicious.</p>
            <button
              onClick={() => router.push('/menu')}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-2xl transition-all transform hover:scale-105 text-lg inline-flex items-center gap-2"
            >
              Order Now →
            </button>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
