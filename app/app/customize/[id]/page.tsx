'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { pizzas, sizeOptions, toppings } from '@/src/data/pizzas';
import { SizeSelector } from '@/src/components/LoveableSizeSelector';
import { ToppingCounter } from '@/src/components/LoveableToppingCounter';
import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import { PizzaSize, CartItem } from '@/src/types/pizza';
import { Footer } from '@/src/components/Footer';
import { ConnectWallet } from '@/src/components/ConnectWallet';

// Dynamic route handler for [id]
export default function CustomizePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [pizza, setPizza] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    if (params?.id) {
      const found = pizzas.find(p => p.id === params.id);
      setPizza(found);
    }
  }, [params?.id]);

  const [size, setSize] = useState<PizzaSize>('medium');
  const [pepperoni, setPepperoni] = useState(0);
  const [mushrooms, setMushrooms] = useState(0);
  const [olives, setOlives] = useState(0);

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black flex items-center justify-center">
      <p className="text-white text-xl">Loading...</p>
    </div>;
  }

  if (!pizza) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black pt-24 flex items-center justify-center">
      <p className="text-white text-xl">Pizza not found</p>
    </div>;
  }

  const selectedSize = sizeOptions.find(s => s.id === size);
  const toppingsCost = (pepperoni + mushrooms + olives) * 0.99;
  const totalPrice = ((selectedSize?.price || 12) + toppingsCost);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: `${pizza.id}-${Date.now()}`,
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      pizzaImage: pizza.image,
      size: size,
      toppings: { pepperoni, mushrooms, olives },
      quantity: 1,
      price: totalPrice,
    };

    addToCart(item);
    addToast(`✅ ${pizza.name} added to cart!`, 'success');
    router.push('/cart');
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
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden border-2 border-purple-500/30 relative">
              <Image
                src={pizza.image}
                alt={pizza.name}
                fill
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Customization */}
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">{pizza.name}</h1>
            <p className="text-gray-400 text-lg mb-6">{pizza.description}</p>

            {/* Price */}
            <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
              <p className="text-gray-400 mb-2">Total Price</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ${totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Choose Size</h2>
              <SizeSelector sizes={sizeOptions} selected={size} onChange={setSize} />
            </div>

            {/* Toppings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Add Toppings ($0.99 each)</h2>
              <div className="space-y-4">
                {toppings.map((topping) => (
                  <ToppingCounter
                    key={topping.id}
                    topping={topping}
                    count={topping.id === 'pepperoni' ? pepperoni : topping.id === 'mushrooms' ? mushrooms : olives}
                    onChange={(count) => {
                      if (topping.id === 'pepperoni') setPepperoni(count);
                      else if (topping.id === 'mushrooms') setMushrooms(count);
                      else setOlives(count);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold text-lg transition-all mb-4"
            >
              🛒 Add to Cart (${totalPrice.toFixed(2)})
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => router.push('/menu')}
              className="w-full py-3 rounded-xl border border-purple-500/30 text-white font-medium hover:border-purple-500/60 hover:bg-purple-500/10 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
