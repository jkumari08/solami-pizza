'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useCart } from '@/src/context/CartContext';
import { useToast } from '@/src/context/ToastContext';
import { useState } from 'react';
import { saveOrder } from '@/src/util/inventory';

export function USDCPayment({ totalAmount }: { totalAmount: number }) {
  const { publicKey, connected } = useWallet();
  const { addToast } = useToast();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleUSDCPayment = async () => {
    if (!connected || !publicKey) {
      addToast('Please connect your wallet first', 'error');
      return;
    }

    setLoading(true);
    try {
      // Simulate USDC payment processing
      addToast('⏳ Processing payment...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate a demo transaction signature for display
      const mockSignature = Array.from({ length: 88 }, () => 
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'[Math.floor(Math.random() * 64)]
      ).join('');

      // Create order record with demo signature
      const order = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        items: cart,
        total: totalAmount,
        status: 'confirmed' as const,
        walletAddress: publicKey.toString(),
      };

      // Save order to localStorage
      saveOrder(order);

      addToast(`✅ Payment successful! Order #${order.id}`, 'success');
      addToast(`📋 Wallet: ${publicKey.toString().slice(0, 8)}...`, 'info');
      clearCart();

      // Redirect to orders page after 2 seconds
      setTimeout(() => {
        window.location.href = '/orders';
      }, 2000);
    } catch (error) {
      console.error('USDC Payment error:', error);
      addToast(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <button
        onClick={() => {
          // Trigger wallet connection by finding and clicking the Connect Wallet button
          const connectButton = document.querySelector('button[class*="gradient-to-r"]');
          if (connectButton instanceof HTMLElement) {
            connectButton.click();
          }
        }}
        className='w-full bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-purple-300 font-medium hover:bg-purple-500/30 hover:border-purple-500/50 transition-all'
      >
        💳 Connect your wallet to pay with USDC
      </button>
    );
  }

  return (
    <button
      onClick={handleUSDCPayment}
      disabled={loading}
      className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all'
    >
      {loading ? '⏳ Processing payment...' : `💳 Pay $${totalAmount.toFixed(2)} with USDC`}
    </button>
  );
}
