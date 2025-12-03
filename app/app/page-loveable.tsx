'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { pizzas } from '@/src/data/pizzas';
import { PizzaCard } from '@/src/components/LoveablePizzaCard';

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="text-5xl">🍕</span> The Future of
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Pizza Payments
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Order delicious, handcrafted pizzas. Pay with Solana. Instant, secure, and lightning-fast transactions powered by blockchain technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/menu')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 text-lg"
                >
                  Start Ordering →
                </button>
                <button
                  onClick={() => router.push('/orders')}
                  className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-500 text-white font-bold rounded-xl transition-all text-lg"
                >
                  View Orders
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-2xl">⚡</span>
                  <span>Lightning-fast payments with Solana</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-2xl">🔒</span>
                  <span>Secure blockchain transactions on devnet</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-2xl">💰</span>
                  <span>Ultra-low transaction fees</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-96 h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-30"></div>
                <Image
                  src="https://images.unsplash.com/photo-1604068549290-dea0e4a305ba?w=400&h=400&fit=crop"
                  alt="Delicious Pizza"
                  width={400}
                  height={400}
                  className="relative w-full h-full object-cover rounded-3xl border-2 border-purple-500/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pizzas Section */}
      <section className="py-20 bg-gray-900/50 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Featured <span className="text-4xl">🍕</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hand-crafted pizzas made with the finest ingredients, customized just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pizzas.slice(0, 4).map((pizza, index) => (
              <PizzaCard key={pizza.id} pizza={pizza} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/menu')}
              className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-500 text-white font-bold rounded-xl transition-all text-lg"
            >
              View Full Menu →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Simple steps to your perfect pizza</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🔌', title: 'Connect Wallet', desc: 'Link your Solana wallet' },
              { icon: '🍕', title: 'Choose Pizza', desc: 'Browse our delicious menu' },
              { icon: '⚙️', title: 'Customize', desc: 'Add your favorite toppings' },
              { icon: '💳', title: 'Pay with SOL', desc: 'Fast blockchain payment' },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="rounded-2xl bg-gray-800 border border-purple-500/20 p-6 text-center h-full hover:border-purple-500/40 transition-all">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Ready to Order?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start experiencing the future of payments with Solami Pizza. Your favorite pizzas, powered by blockchain.
          </p>
          <button
            onClick={() => router.push('/menu')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 text-lg"
          >
            Explore Menu Now 🍕
          </button>
        </div>
      </section>
    </main>
  );
}
