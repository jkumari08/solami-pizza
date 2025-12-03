'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Pizza } from '@/src/types/pizza';
import Link from 'next/link';

interface PizzaCardProps {
  pizza: Pizza;
  index?: number;
}

export function PizzaCard({ pizza, index = 0 }: PizzaCardProps) {
  return (
    <Link href={`/customize/${pizza.id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl border border-purple-500/30 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer h-full flex flex-col"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden bg-gray-900">
          <Image
            src={pizza.image}
            alt={pizza.name}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur text-white capitalize">
              {pizza.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 bg-gray-900/40 backdrop-blur flex flex-col justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < pizza.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-600 text-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Name & Description */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white mb-2">{pizza.name}</h3>
            <p className="text-sm text-gray-300">
              {pizza.description}
            </p>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-purple-500/20">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ${pizza.basePrice.toFixed(2)}
            </span>
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-xs transition-all">
              Customize 🍕
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
