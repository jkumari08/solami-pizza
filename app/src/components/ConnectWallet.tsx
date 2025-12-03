'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

export function ConnectWallet() {
  const walletContext = useWallet();
  const { wallet, connect, disconnect, connected, publicKey, wallets, select } = walletContext;
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = async () => {
    try {
      setError(null);
      if (connected && publicKey) {
        await disconnect();
      } else if (wallets && wallets.length > 0) {
        // Select Phantom wallet if available
        const phantomWallet = wallets.find(w => w.adapter.name === 'Phantom');
        if (phantomWallet) {
          select(phantomWallet.adapter.name);
        } else if (wallets.length > 0) {
          select(wallets[0].adapter.name);
        }
        // Now connect
        setTimeout(async () => {
          try {
            await connect();
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to connect');
            console.error('Connect error:', err);
          }
        }, 100);
      } else {
        setError('No wallets available. Please install a Solana wallet.');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Connection failed';
      setError(errorMsg);
      console.error('Wallet connection error:', err);
    }
  };

  if (!mounted) {
    return (
      <button className='px-6 py-2 rounded-lg font-semibold bg-gray-600 text-white cursor-not-allowed text-sm'>
        Loading...
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={handleConnect}
        className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
          connected
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white'
            : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white'
        }`}
      >
        {connected && publicKey
          ? `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}`
          : 'Connect Wallet'}
      </button>
      {error && (
        <p className='text-red-400 text-xs mt-1'>{error}</p>
      )}
    </div>
  );
}
