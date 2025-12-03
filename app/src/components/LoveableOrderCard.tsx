'use client';

import React from 'react';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { Order } from '@/src/types/pizza';

interface OrderCardProps {
  order: Order;
}

export function LoveableOrderCard({ order }: OrderCardProps) {
  const getStatusIcon = () => {
    switch (order.status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'completed':
        return <Package className="h-5 w-5 text-purple-400" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-yellow-500/20 text-yellow-400';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getItemsSummary = () => {
    return order.items.map(item => `${item.quantity}x ${item.pizzaName}`).join(', ');
  };

  return (
    <div className="p-5 rounded-xl bg-gray-800 border border-purple-500/20 hover:border-purple-500/40 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400">Order ID</p>
          <p className="font-mono font-semibold text-white">{order.id}</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor()}`}>
          {getStatusIcon()}
          {order.status}
        </div>
      </div>

      {/* Items */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-1">Items</p>
        <p className="text-white">{getItemsSummary()}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-400">Date</p>
          <p className="text-white">{formatDate(order.timestamp)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            €{order.total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Wallet */}
      <div className="pt-4 border-t border-purple-500/20">
        <p className="text-sm text-gray-400">Paid with</p>
        <p className="font-mono text-sm text-white truncate">{order.walletAddress}</p>
      </div>
    </div>
  );
}
