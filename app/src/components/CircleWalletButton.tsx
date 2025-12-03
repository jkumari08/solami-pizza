'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/src/context/ToastContext';

interface CircleWalletButtonProps {
  totalAmount?: number;
}

export function CircleWalletButton({ totalAmount = 0 }: CircleWalletButtonProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [walletId, setWalletId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [total, setTotal] = useState(totalAmount);
  const [mounted, setMounted] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setMounted(true);
    // Use the passed totalAmount if available, otherwise calculate from cart
    if (totalAmount && totalAmount > 0) {
      setTotal(totalAmount);
    } else {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const subtotal = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      setTotal(subtotal + tax);
    }
  }, [totalAmount]);

  const createCircleWallet = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      addToast('❌ Please enter a valid email', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/circle/create-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to create wallet');
      }

      const data = await response.json();

      if (data.success) {
        setWalletId(data.walletId);
        setCreated(true);
        localStorage.setItem('circleWalletId', data.walletId);
        localStorage.setItem('circleWalletEmail', email);
        addToast(`✅ Circle wallet created for ${email}!`, 'success');
      }
    } catch (error) {
      console.error('Error:', error);
      addToast(`❌ Failed to create wallet: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [email, addToast]);

  if (!mounted) {
    return (
      <div className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg">
        <div className="animate-pulse space-y-3">
          <div className="h-10 bg-slate-700/50 rounded"></div>
          <div className="h-10 bg-slate-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  const processCirclePayment = async () => {
    if (!walletId || !email) {
      addToast('❌ Missing wallet information', 'error');
      return;
    }

    setProcessing(true);
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      const response = await fetch('/api/circle/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletId,
          email,
          amount: total,
          items: cart,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment failed');
      }

      const data = await response.json();

      if (data.success) {
        addToast('✅ Payment processed! Your order is confirmed.', 'success');
        // Store order using the correct key and format
        const order = {
          id: `circle_${Date.now()}`,
          timestamp: Date.now(),
          items: cart,
          total,
          status: 'confirmed' as const,
          reference: data.transactionId || `circle_${Date.now()}`,
          paymentMethod: 'Circle Wallet',
          email,
          walletId,
        };
        const orders = JSON.parse(localStorage.getItem('pizza_orders') || '[]');
        orders.unshift(order); // Add to beginning (newest first)
        localStorage.setItem('pizza_orders', JSON.stringify(orders));
        
        // Reset
        setCreated(false);
        setEmail('');
        setWalletId('');
        window.location.href = '/orders';
      }
    } catch (error) {
      console.error('Payment error:', error);
      addToast(`❌ Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (created) {
    return (
      <div className="p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <div>
            <h3 className="text-white font-bold">Circle Wallet Created!</h3>
            <p className="text-gray-300 text-sm">{email}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Your Circle wallet is ready. You can now pay for pizza with USDC without managing crypto!
        </p>
        <p className="text-xs text-gray-500 mb-4">Wallet ID: {walletId}</p>
        
        <div className="space-y-3">
          <button
            onClick={processCirclePayment}
            disabled={processing}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-all"
          >
            {processing ? '⏳ Processing Payment...' : `💳 Pay $${total.toFixed(2)} with Circle Wallet`}
          </button>
          
          <button
            onClick={() => {
              setCreated(false);
              setEmail('');
              setWalletId('');
            }}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded font-semibold transition-all"
          >
            Create Different Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎯</span>
        <h3 className="text-white font-bold">Pay Without Crypto Wallet</h3>
      </div>
      <p className="text-gray-300 text-sm mb-4">
        Create a Circle email-based wallet. No seed phrases, no extensions, just simple USDC payments.
      </p>
      
      <form onSubmit={createCircleWallet} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-all"
        >
          {loading ? '⏳ Creating Wallet...' : '✨ Create Circle Wallet'}
        </button>
      </form>

      <div className="mt-4 p-3 bg-slate-800/50 rounded text-xs text-gray-400 space-y-1">
        <p>✅ No seed phrase to manage</p>
        <p>✅ Email-based account recovery</p>
        <p>✅ Direct USDC payments on Solana</p>
        <p>✅ Instant settlement to bank</p>
      </div>
    </div>
  );
}
