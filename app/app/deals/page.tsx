'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Footer } from '@/src/components/Footer';
import { ConnectWallet } from '@/src/components/ConnectWallet';

export default function DealsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const deals = [
    {
      code: 'SOLANA20',
      discount: '20%',
      title: '20% Off First Order',
      description: 'Get 20% discount on your first order with USDC',
      color: 'from-purple-600 to-blue-600',
      icon: '🎉',
    },
    {
      code: 'LUNCH20',
      discount: '15%',
      title: '15% Off Lunch Special',
      description: 'Order between 11am-2pm and save 15% on any pizza',
      color: 'from-cyan-600 to-blue-600',
      icon: '💰',
    },
    {
      code: 'FREEPIZZA',
      discount: 'FREE',
      title: 'Buy 2 Get 1 Free',
      description: 'Order 2 pizzas and get 1 pizza free with USDC',
      color: 'from-purple-600 to-cyan-600',
      icon: '🍕',
    },
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
            <Link href="/deals" className="text-purple-400 hover:text-purple-300 transition">Deals</Link>
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            Deals & <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Promo Codes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Save big on your favorite pizzas with our exclusive Solana Pay promotions
          </p>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <div
                key={deal.code}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="text-6xl mb-4">{deal.icon}</div>

                  <div className="mb-6">
                    <div className="text-sm text-cyan-400 font-semibold mb-2">LIMITED TIME OFFER</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{deal.title}</h3>
                    <p className="text-gray-400">{deal.description}</p>
                  </div>

                  <div className={`bg-gradient-to-r ${deal.color} rounded-xl p-4 mb-6 text-center`}>
                    <div className="text-4xl font-bold text-white">{deal.discount} OFF</div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">PROMO CODE</div>
                      <div className="text-lg font-mono font-bold text-white">{deal.code}</div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(deal.code)}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        copiedCode === deal.code
                          ? 'bg-green-600 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {copiedCode === deal.code ? '✓ Copied!' : 'Copy Code'}
                    </button>

                    <Link
                      href="/menu"
                      className="block w-full text-center py-3 rounded-lg border border-cyan-500/50 hover:border-cyan-500 text-cyan-400 hover:text-cyan-300 font-semibold transition-all"
                    >
                      Use This Deal
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">How to Use Promo Codes</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Browse Menu', desc: 'Select your favorite pizzas' },
              { step: 2, title: 'Add to Cart', desc: 'Customize and add to cart' },
              { step: 3, title: 'Enter Code', desc: 'Apply promo at checkout' },
              { step: 4, title: 'Pay with SOL', desc: 'Complete with Solana Pay' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to save on your order?</h2>
          <Link
            href="/menu"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 text-lg"
          >
            Start Ordering with Deals →
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
