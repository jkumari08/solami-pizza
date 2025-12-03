'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '@/src/types/pizza';
import { useCart } from '@/src/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function LoveableCartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const getToppingsString = () => {
    const toppings = [];
    if (item.toppings?.pepperoni > 0) toppings.push(`${item.toppings.pepperoni}x Pepperoni`);
    if (item.toppings?.mushrooms > 0) toppings.push(`${item.toppings.mushrooms}x Mushrooms`);
    if (item.toppings?.olives > 0) toppings.push(`${item.toppings.olives}x Olives`);
    return toppings.length > 0 ? toppings.join(', ') : 'No extra toppings';
  };

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-gray-800 border border-purple-500/20">
      {/* Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.pizzaImage}
          alt={item.pizzaName}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{item.pizzaName}</h3>
        <p className="text-sm text-gray-400 capitalize">{item.size} size</p>
        <p className="text-sm text-gray-400 truncate">{getToppingsString()}</p>
        <p className="text-lg font-bold text-purple-400 mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 border border-purple-500/30 rounded-lg hover:border-purple-500/60 transition-all"
          >
            <Minus className="h-3 w-3 text-white" />
          </button>
          <span className="w-6 text-center font-medium text-white">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 border border-purple-500/30 rounded-lg hover:border-purple-500/60 transition-all"
          >
            <Plus className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
