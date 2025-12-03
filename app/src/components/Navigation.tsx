'use client';

import Link from 'next/link';
import { useCart } from '@/src/context/CartContext';
import { ConnectWalletWrapper } from '@/src/components/ConnectWalletWrapper';

export const Navigation = () => {
  const { itemCount } = useCart();

  return (
    <nav className='bg-red-700 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <Link href='/' className='text-2xl font-bold hover:text-red-100'>
            🍕 Solami Pizza
          </Link>
          <div className='flex gap-4'>
            <Link href='/' className='hover:text-red-100'>
              Shop
            </Link>
            <Link href='/cart' className='hover:text-red-100 relative flex items-center gap-1'>
              🛒 Cart
              {itemCount > 0 && (
                <span className='absolute -top-2 -right-3 bg-yellow-400 text-red-700 rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold'>
                  {itemCount}
                </span>
              )}
            </Link>
            <Link href='/orders' className='hover:text-red-100'>
              Orders
            </Link>
            <Link href='/admin' className='hover:text-red-100'>
              Admin
            </Link>
          </div>
        </div>
        <div>
          <ConnectWalletWrapper />
        </div>
      </div>
    </nav>
  );
};
