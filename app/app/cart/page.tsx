'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import { LoveableCartItem } from '@/src/components/LoveableCartItem';
import { USDCPayment } from '@/src/components/USDCPayment';
import { CircleWalletButton } from '@/src/components/CircleWalletButton';
import { Footer } from '@/src/components/Footer';
import { ConnectWallet } from '@/src/components/ConnectWallet';

export default function CartPage() {
  const router = useRouter();
  const { cart, getTotalAmount } = useCart();
  const { addToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotalAmount();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
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
              <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
              <Link href="/cart" className="relative text-purple-400 hover:text-purple-300 transition text-xl">
                🛒
              </Link>
              <ConnectWallet />
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-white mb-4">🛒 Your Cart</h1>
            <p className="text-xl text-gray-400 mb-8">Your cart is empty. Let's fill it up with delicious pizza!</p>
            <button
              onClick={() => router.push('/menu')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all"
            >
              Continue Shopping 🍕
            </button>
          </div>
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
            <Link href="/orders" className="text-gray-400 hover:text-white transition">Orders</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
            <Link href="/cart" className="relative text-purple-400 hover:text-purple-300 transition text-xl">
              🛒
            </Link>
            <ConnectWallet />
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-5xl font-bold text-white mb-12">
          <span className="text-4xl">🛒</span> Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <LoveableCartItem key={item.id} item={item} />
              ))}
            </div>

            <button
              onClick={() => router.push('/menu')}
              className="mt-6 px-6 py-3 border border-purple-500/30 text-white font-medium rounded-xl hover:border-purple-500/60 hover:bg-purple-500/10 transition-all"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-gray-800 border border-purple-500/20 p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-purple-500/20">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-2">Option 1: Connect Crypto Wallet</p>
                  <USDCPayment totalAmount={total} />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-purple-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-gray-800 text-gray-400">OR</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">Option 2: Create Circle Wallet (No Crypto Needed)</p>
                  <CircleWalletButton totalAmount={total} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
