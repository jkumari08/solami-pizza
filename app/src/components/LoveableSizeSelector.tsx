'use client';

import React from 'react';
import { PizzaSize, SizeOption } from '@/types/pizza';

interface SizeSelectorProps {
  sizes: SizeOption[];
  selected: PizzaSize;
  onChange: (size: PizzaSize) => void;
}

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onChange(size.id)}
          className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
            selected === size.id
              ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
              : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
          }`}
        >
          <p className="font-semibold text-white">{size.name}</p>
          <p className={`text-lg font-bold ${selected === size.id ? 'text-purple-400' : 'text-gray-500'}`}>
            ${size.price.toFixed(2)}
          </p>
        </button>
      ))}
    </div>
  );
}
