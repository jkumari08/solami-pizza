'use client';

import { useState } from 'react';
import { validatePromoCode, calculateDiscount } from '@/src/util/inventory';
import { useToast } from '@/src/context/ToastContext';

interface PromoCodeInputProps {
  cartTotal: number;
  onDiscountApplied: (discountAmount: number, discountType: 'percentage' | 'fixed', code: string) => void;
}

export const PromoCodeInput = ({ cartTotal, onDiscountApplied }: PromoCodeInputProps) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const { addToast } = useToast();

  const handleApplyCode = () => {
    if (!promoCode.trim()) {
      addToast('Please enter a promo code', 'warning');
      return;
    }

    const result = validatePromoCode(promoCode);
    
    if (!result.valid) {
      addToast(result.message, 'error');
      return;
    }

    setAppliedCode(promoCode);
    setDiscount(result.discount);
    
    // Determine discount type from the validation
    const codes = require('@/src/util/inventory').getPromoCodes();
    const code = codes.find((c: any) => c.code.toUpperCase() === promoCode.toUpperCase());
    if (code) {
      setDiscountType(code.discountType);
      onDiscountApplied(result.discount, code.discountType, promoCode);
    }

    addToast(result.message, 'success');
  };

  const handleClearCode = () => {
    setPromoCode('');
    setAppliedCode(null);
    setDiscount(0);
    onDiscountApplied(0, 'percentage', '');
    addToast('Promo code removed', 'info');
  };

  const discountAmount = calculateDiscount(cartTotal, discount, discountType);

  return (
    <div className='border rounded-lg p-4 bg-gray-50 mb-4'>
      <h3 className='font-bold mb-3'>Apply Promo Code</h3>
      
      {appliedCode ? (
        <div className='bg-green-100 border border-green-300 rounded-lg p-3 mb-3'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='font-semibold text-green-800'>✓ {appliedCode} applied</p>
              <p className='text-sm text-green-700'>
                {discountType === 'percentage' 
                  ? `${discount}% off` 
                  : `€${discount.toFixed(2)} off`}
              </p>
            </div>
            <button
              onClick={handleClearCode}
              className='text-red-600 hover:text-red-800 font-bold'
            >
              Remove
            </button>
          </div>
          <p className='text-sm font-bold text-green-900 mt-2'>
            Discount: -€{discountAmount.toFixed(2)}
          </p>
        </div>
      ) : (
        <div className='flex gap-2 mb-3'>
          <input
            type='text'
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder='Enter promo code'
            className='flex-1 border rounded-lg px-3 py-2'
            onKeyPress={(e) => e.key === 'Enter' && handleApplyCode()}
          />
          <button
            onClick={handleApplyCode}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold'
          >
            Apply
          </button>
        </div>
      )}

      <p className='text-xs text-gray-600'>
        Try: <span className='font-semibold'>WELCOME10</span>, <span className='font-semibold'>SOLANA20</span>, or <span className='font-semibold'>PIZZA5</span>
      </p>
    </div>
  );
};
