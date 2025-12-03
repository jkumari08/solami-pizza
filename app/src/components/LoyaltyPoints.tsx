'use client';

import { useEffect, useState } from 'react';
import { getLoyaltyPoints, pointsToEuros } from '@/src/util/inventory';

export const LoyaltyPoints = () => {
  const [points, setPoints] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPoints(getLoyaltyPoints());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const eurosValue = pointsToEuros(points);

  return (
    <div className='bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg p-4 shadow-md border-2 border-yellow-500'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-sm text-yellow-900 font-semibold'>Loyalty Points ⭐</p>
          <p className='text-3xl font-bold text-yellow-900'>{points}</p>
          <p className='text-xs text-yellow-800'>Worth €{eurosValue.toFixed(2)}</p>
        </div>
        <div className='text-right'>
          <p className='text-xs text-yellow-800 mb-2'>Earn 1 point per €1</p>
          <div className='w-24 h-3 bg-yellow-200 rounded-full overflow-hidden'>
            <div 
              className='h-full bg-yellow-600 transition-all'
              style={{ width: `${Math.min((points % 100) / 100 * 100, 100)}%` }}
            ></div>
          </div>
          <p className='text-xs text-yellow-800 mt-1'>{100 - (points % 100)} to next reward</p>
        </div>
      </div>
    </div>
  );
};
