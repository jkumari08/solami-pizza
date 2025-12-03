'use client';

import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import Link from 'next/link';

export const CartView = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();

  const handleRemove = (name: string) => {
    removeFromCart(name);
    addToast(`Removed from cart`, 'info');
  };

  if (cart.length === 0) {
    return (
      <div className='bg-white shadow-md rounded-2xl border-solid border border-black mx-auto w-full max-w-2xl p-6'>
        <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
        <p className='text-gray-600 text-center py-8'>Your cart is empty</p>
        <Link href='/' className='text-blue-600 hover:underline'>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-white shadow-md rounded-2xl border-solid border border-black mx-auto w-full max-w-2xl p-6'>
      <h2 className='text-2xl font-bold mb-6'>Your Cart</h2>
      
      <div className='space-y-4 mb-6'>
        {cart.map(item => (
          <div key={item.id} className='flex justify-between items-center border-b pb-4'>
            <div className='flex-1'>
              <h3 className='font-semibold text-lg'>{item.pizzaName}</h3>
              <p className='text-sm text-gray-600'>€{item.price.toFixed(2)} each</p>
            </div>
            
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
                >
                  -
                </button>
                <span className='font-bold w-8 text-center'>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'
                >
                  +
                </button>
              </div>
              
              <div className='w-20 text-right'>
                <p className='font-bold text-lg'>€{(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <button
                onClick={() => handleRemove(item.id)}
                className='bg-gray-400 hover:bg-gray-600 text-white px-3 py-1 rounded'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='border-t pt-4 mb-6'>
        <div className='flex justify-between text-2xl font-bold mb-4'>
          <span>Total:</span>
          <span className='text-blue-600'>€{cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className='flex gap-4'>
        <Link 
          href='/' 
          className='flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-center'
        >
          Continue Shopping
        </Link>
        <button
          onClick={clearCart}
          className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg'
        >
          Clear Cart
        </button>
        <Link 
          href='/checkout' 
          className='flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-center'
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
