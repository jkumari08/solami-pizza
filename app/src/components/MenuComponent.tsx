'use client';

import { useState } from 'react';
import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import { DEFAULT_MENU_ITEMS, MenuItem, getInventory } from '@/src/util/inventory';
import { ReviewModal, ReviewDisplay } from './ReviewModal';
import { SearchFilter } from './SearchFilter';

interface MenuProps {
  onCheckout: () => void;
}

export const MenuComponent = ({ onCheckout }: MenuProps) => {
  const { cart, addToCart } = useCart();
  const { addToast } = useToast();
  const [inventory] = useState(getInventory());
  const [selectedReviewItem, setSelectedReviewItem] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);

  const handleAddItem = (itemId: string) => {
    const item = DEFAULT_MENU_ITEMS.find(m => m.id === itemId);
    const inStock = inventory.find(i => i.id === itemId)?.stock || 0;
    
    if (inStock === 0) {
      addToast(`${item?.name} is out of stock`, 'error');
      return;
    }

    if (item) {
      addToCart({
        menuItemId: item.id,
        quantity: 1,
        name: item.name,
        price: item.price,
      });
      addToast(`${item.name} added to cart!`, 'success');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='flex flex-col justify-center'>
      {/* Store Header */}
      <div className='bg-white shadow-md rounded-xl border-solid border border-black mx-auto w-fit p-2 mb-2'>
        <h4 className='text-xl text-slate-700'>Valentin&apos;s Pizza Shop</h4>
      </div>

      {/* Menu Items */}
      <div className='bg-white shadow-md rounded-2xl border-solid border border-black mx-auto w-full max-w-2xl p-6 mb-2'>
        <div className='text-center'>
          <p className='text-sm text-gray-700 my-4'>
            Customize your pizza with fresh ingredients:
          </p>

          {/* Search & Filter Section */}
          <SearchFilter items={DEFAULT_MENU_ITEMS} onFiltered={setFilteredItems} />

          <ul className='text-sm text-gray-600 space-y-4'>
            {filteredItems.map(item => {
              const inCart = cart.find(c => c.menuItemId === item.id);
              const inStock = inventory.find(i => i.id === item.id)?.stock || 0;
              const isLowStock = inStock > 0 && inStock <= 10;
              const isOutOfStock = inStock === 0;

              return (
                <li key={item.id} className='flex flex-row justify-between items-center border-b pb-4'>
                  <div className='text-left flex-1'>
                    <p className='font-bold'>{item.name}</p>
                    <ReviewDisplay menuItemId={item.id} />
                    <div className='flex items-center gap-2 mt-1'>
                      <p className='text-xs text-gray-500'>Stock: {inStock}</p>
                      {isLowStock && (
                        <span className='inline-block bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded'>
                          Low Stock
                        </span>
                      )}
                      {isOutOfStock && (
                        <span className='inline-block bg-red-300 text-red-900 text-xs font-bold px-2 py-0.5 rounded'>
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                  <p className='font-bold text-red-600 w-20 text-right'>€{item.price.toFixed(2)}</p>
                  <div className='ml-6 flex gap-2 items-center'>
                    <button 
                      onClick={() => handleAddItem(item.id)}
                      disabled={isOutOfStock}
                      className='bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-1 rounded'
                    >
                      +
                    </button>
                    <button
                      onClick={() => setSelectedReviewItem(item.id)}
                      className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm'
                      title='Write a review'
                    >
                      ⭐
                    </button>
                    {inCart && (
                      <span className='font-bold w-6 text-center text-lg'>{inCart.quantity}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {cart.length > 0 && (
            <>
              <h3 className='mt-8 text-2xl font-bold'>
                Total: <span className='text-blue-600'>€{cartTotal.toFixed(2)}</span>
              </h3>
              <button
                onClick={onCheckout}
                className='mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg font-bold text-lg'
              >
                Proceed to Checkout
              </button>
            </>
          )}

          {cart.length === 0 && (
            <p className='mt-8 text-gray-600'>Add items to get started!</p>
          )}
        </div>
      </div>

      {selectedReviewItem && (
        <ReviewModal
          menuItemId={selectedReviewItem}
          itemName={DEFAULT_MENU_ITEMS.find(m => m.id === selectedReviewItem)?.name || 'Item'}
          onClose={() => setSelectedReviewItem(null)}
        />
      )}
    </div>
  );
};
