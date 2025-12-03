'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-t border-purple-500/30">
      <div className="container mx-auto px-4 py-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
          {/* Left Section - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🍕</span>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Solami Pizza
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The future of pizza payments. Fast, cheap, and secure.
            </p>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Quick Links</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section - Payment Methods */}
          <div>
            <h3 className="text-base font-bold text-white mb-2">Payment</h3>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>◎</span>
                <span>Solana (SOL)</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <span>💵</span>
                <span>USDC</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/20 my-3"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-gray-600 text-xs">
          <div>
            © 2025 Solami Pizza. Built on Solana.
          </div>
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Devnet Demo – No real money involved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

