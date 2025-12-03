'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Topping } from '@/src/types/pizza';

interface ToppingCounterProps {
  topping: Topping;
  count: number;
  onChange: (count: number) => void;
  max?: number;
}

export function ToppingCounter({ topping, count, onChange, max = 5 }: ToppingCounterProps) {
  const increment = () => {
    if (count < max) {
      onChange(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      onChange(count - 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50 border border-purple-500/20">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{topping.emoji}</span>
        <div>
          <p className="font-medium text-white">{topping.name}</p>
          <p className="text-sm text-gray-400">${topping.price.toFixed(2)} per portion</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={decrement}
          disabled={count === 0}
          className="p-2 rounded-lg border border-purple-500/30 hover:border-purple-500/60 disabled:opacity-50 transition-all"
        >
          <Minus className="h-4 w-4 text-white" />
        </button>

        <span className={`w-8 text-center font-bold text-lg ${count > 0 ? 'text-purple-400' : 'text-gray-500'}`}>
          {count}
        </span>

        <button
          onClick={increment}
          disabled={count === max}
          className="p-2 rounded-lg border border-purple-500/30 hover:border-purple-500/60 disabled:opacity-50 transition-all"
        >
          <Plus className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  );
}
