'use client';

import { useCart } from '@/src/context/CartContext';
import { PromoCodeInput } from '@/src/components/PromoCodeInput';
import { USDCPayment } from '@/src/components/USDCPayment';
import Link from 'next/link';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [appliedCode, setAppliedCode] = useState('');

  const handleDiscountApplied = (discount: number, type: 'percentage' | 'fixed', code: string) => {
    setDiscountAmount(discount);
    setDiscountType(type);
    setAppliedCode(code);
  };

  const finalDiscount = 
    discountType === 'percentage' 
      ? (cartTotal * discountAmount) / 100
      : discountAmount;

  const finalTotal = Math.max(0, cartTotal - finalDiscount);

  if (cart.length === 0) {
    return (
      <main className='min-h-screen bg-red-500 p-4'>
        <div className='max-w-7xl mx-auto py-8'>
          <div className='bg-white shadow-md rounded-2xl border-solid border border-black p-6'>
            <h1 className='text-2xl font-bold mb-4'>Checkout</h1>
            <p className='text-gray-600 mb-4'>Your cart is empty</p>
            <Link href='/' className='text-blue-600 hover:underline'>
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-red-500 p-4'>
      <div className='max-w-2xl mx-auto py-8'>
        <div className='bg-white shadow-md rounded-2xl border-solid border border-black p-6'>
          <h1 className='text-2xl font-bold mb-6'>Order Summary</h1>

          <div className='mb-6 bg-gray-100 p-4 rounded'>
            <h2 className='font-bold mb-3'>Items:</h2>
            <div className='space-y-2'>
              {cart.map(item => (
                <div key={item.menuItemId} className='flex justify-between'>
                  <span>{item.name} x {item.quantity}</span>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <PromoCodeInput cartTotal={cartTotal} onDiscountApplied={handleDiscountApplied} />

          <div className='border-t pt-4 mb-6'>
            <div className='flex justify-between mb-2'>
              <span>Subtotal:</span>
              <span>€{cartTotal.toFixed(2)}</span>
            </div>
            {finalDiscount > 0 && (
              <div className='flex justify-between text-green-600 mb-2'>
                <span>Discount ({appliedCode}):</span>
                <span>-€{finalDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className='flex justify-between text-2xl font-bold mt-4'>
              <span>Total:</span>
              <span className='text-blue-600'>€{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className='mb-4'>
            <h3 className='font-bold mb-3 text-lg'>Payment Method</h3>
            <USDCPayment totalAmount={finalTotal} />
          </div>

          <div className='flex gap-4'>
            <Link 
              href='/' 
              className='flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-center'
            >
              Continue Shopping
            </Link>
          </div>
          
          <p className='mt-4 text-sm text-gray-600 text-center bg-blue-100 p-3 rounded'>
            💳 Connect your Solana wallet above to pay with USDC on devnet
          </p>
        </div>
      </div>
    </main>
  );
}
