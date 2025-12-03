'use client';

import { CartProvider } from '@/src/context/CartContext'
import { ToastProvider } from '@/src/context/ToastContext'
import { WalletContextProvider } from '@/src/context/WalletContext'
import { ToastContainer } from '@/src/components/ToastContainer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalletContextProvider>
      <CartProvider>
        <ToastProvider>
          <ToastContainer />
          {children}
        </ToastProvider>
      </CartProvider>
    </WalletContextProvider>
  )
}
