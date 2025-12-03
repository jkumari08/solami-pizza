'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Footer } from '@/src/components/Footer';
import { ConnectWallet } from '@/src/components/ConnectWallet';

export default function AboutPage() {
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
            <Link href="/orders" className="text-gray-400 hover:text-white transition">Orders</Link>
            <Link href="/about" className="text-purple-400 hover:text-purple-300 transition">About</Link>
            <Link href="/cart" className="relative text-gray-400 hover:text-white transition text-xl">
              🛒
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Solami Pizza</span> 🍕
          </h1>
          <p className="text-xl text-gray-300">
            We&apos;re on a mission to revolutionize how you order and pay for pizza 
            using the power of blockchain technology.
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300">
              Solami Pizza combines the joy of delicious, handcrafted pizzas with the 
              cutting-edge technology of Solana blockchain. We believe that payments 
              should be fast, cheap, and secure – just like our pizza deliveries.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur border border-purple-500/30 text-center hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-300">
              Solana processes transactions in milliseconds, not minutes. Your payment 
              is confirmed before you can say &quot;pizza&quot;!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur border border-purple-500/30 text-center hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="w-14 h-14 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Super Cheap</h3>
            <p className="text-gray-300">
              Transaction fees on Solana are fractions of a cent. More money for 
              extra toppings!
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur border border-purple-500/30 text-center hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
            <p className="text-gray-300">
              Blockchain technology ensures your transactions are immutable and 
              transparent. No chargebacks, no fraud.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'React',
              'TypeScript',
              'Solana',
              'Tailwind CSS',
            ].map((tech) => (
              <div
                key={tech}
                className="p-4 rounded-xl bg-gray-900/50 backdrop-blur border border-purple-500/30 text-center"
              >
                <span className="font-medium text-white">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Devnet Notice */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center">
            <h3 className="text-xl font-bold text-white mb-2">⚠️ Devnet Demo</h3>
            <p className="text-gray-300">
              This is a demonstration app running on Solana Devnet. No real money 
              is involved. Feel free to test with devnet tokens!
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Try?</h2>
          <p className="text-gray-300 mb-6">
            Experience the future of pizza payments today.
          </p>
          <button
            onClick={() => router.push('/menu')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 text-lg"
          >
            Order Now 🍕
          </button>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
