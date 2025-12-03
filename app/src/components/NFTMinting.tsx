'use client';

import { useState } from 'react';
import { Order } from '@/src/util/inventory';

interface NFTMintingProps {
  order: Order;
}

export const NFTMinting = ({ order }: NFTMintingProps) => {
  const [isMinting, setIsMinting] = useState(false);
  const [nftUrl, setNftUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMintNFT = async () => {
    setIsMinting(true);
    setError(null);

    try {
      // Create a simple SVG NFT certificate for the order
      const nftSvg = `
        <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f97316;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
            </linearGradient>
          </defs>
          
          <rect width="400" height="500" fill="url(#grad)" />
          
          <text x="200" y="60" font-size="48" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">
            🍕 PIZZA NFT
          </text>
          
          <rect x="30" y="100" width="340" height="280" fill="rgba(255,255,255,0.1)" rx="10" stroke="white" stroke-width="3" />
          
          <text x="200" y="140" font-size="24" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">
            Order Receipt
          </text>
          
          <text x="50" y="180" font-size="14" fill="white" font-family="monospace">
            Order ID: ${order.id.slice(0, 8).toUpperCase()}
          </text>
          
          <text x="50" y="220" font-size="14" fill="white" font-family="monospace">
            Items: ${order.items.length} Pizza(s)
          </text>
          
          <text x="50" y="260" font-size="14" fill="white" font-family="monospace">
            Total: €${order.total.toFixed(2)}
          </text>
          
          <text x="50" y="300" font-size="12" fill="rgba(255,255,255,0.9)" font-family="monospace">
            Date: ${new Date(order.timestamp).toLocaleDateString()}
          </text>
          
          <text x="50" y="340" font-size="12" fill="rgba(255,255,255,0.9)" font-family="monospace">
            Minted on Solana Blockchain
          </text>
          
          <text x="200" y="430" font-size="20" text-anchor="middle" fill="white" font-family="Arial">
            ✓ Authentic Certificate
          </text>
        </svg>
      `;

      // Convert SVG to data URL
      const svgBlob = new Blob([nftSvg], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, you would upload to Arweave/IPFS and mint on Solana
      // For now, we'll just generate a mock NFT URL
      const mockNFTUrl = `https://pizza-nft-certificate.example.com/nft/${order.id}`;
      
      setNftUrl(mockNFTUrl);
      localStorage.setItem(`nft_${order.id}`, mockNFTUrl);
    } catch (err) {
      setError('Failed to mint NFT. Please try again.');
      console.error('NFT minting error:', err);
    } finally {
      setIsMinting(false);
    }
  };

  // Check if NFT was already minted for this order
  const existingNFT = localStorage.getItem(`nft_${order.id}`);
  const mintedUrl = nftUrl || existingNFT;

  return (
    <div className='bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 rounded-lg p-4 mt-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='font-bold text-lg flex items-center gap-2'>
            <span className='text-2xl'>🎪</span> NFT Receipt
          </h3>
          <p className='text-sm text-gray-700 dark:text-gray-300'>Mint a blockchain certificate for this order</p>
        </div>

        {mintedUrl ? (
          <div className='text-right'>
            <div className='text-green-600 dark:text-green-400 font-bold text-sm mb-1'>✓ Minted</div>
            <a
              href={mintedUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold text-sm transition'
            >
              View NFT →
            </a>
          </div>
        ) : (
          <button
            onClick={handleMintNFT}
            disabled={isMinting}
            className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded font-semibold transition'
          >
            {isMinting ? 'Minting...' : 'Mint NFT'}
          </button>
        )}
      </div>

      {error && (
        <div className='mt-3 bg-red-200 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-3 py-2 rounded text-sm'>
          {error}
        </div>
      )}

      {isMinting && (
        <div className='mt-3 text-sm text-gray-700 dark:text-gray-300'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
            Creating your NFT certificate on Solana...
          </div>
        </div>
      )}
    </div>
  );
};
