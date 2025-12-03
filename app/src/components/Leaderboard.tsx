'use client';

import { useState, useEffect } from 'react';
import { getOrders, getLoyaltyPoints } from '@/src/util/inventory';

interface LeaderboardEntry {
  rank: number;
  orders: number;
  totalSpent: number;
  loyaltyPoints: number;
}

export const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [sortBy, setSortBy] = useState<'orders' | 'spent' | 'loyalty'>('spent');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const orders = getOrders();
    const loyaltyPoints = getLoyaltyPoints();
    const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    // For demo purposes, show a single "Player" entry
    // In a real app, you'd have multiple users tracked
    const playerEntry: LeaderboardEntry = {
      rank: 1,
      orders: orders.length,
      totalSpent: totalSpent,
      loyaltyPoints: loyaltyPoints,
    };

    setEntries([playerEntry]);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sortedEntries = [...entries].sort((a, b) => {
    switch (sortBy) {
      case 'orders':
        return b.orders - a.orders;
      case 'spent':
        return b.totalSpent - a.totalSpent;
      case 'loyalty':
        return b.loyaltyPoints - a.loyaltyPoints;
      default:
        return 0;
    }
  });

  return (
    <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
      <h2 className='text-3xl font-bold mb-6'>🏅 Leaderboard & Stats</h2>

      <div className='flex gap-2 mb-6'>
        <button
          onClick={() => setSortBy('spent')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            sortBy === 'spent'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          💰 By Spent
        </button>
        <button
          onClick={() => setSortBy('orders')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            sortBy === 'orders'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          📦 By Orders
        </button>
        <button
          onClick={() => setSortBy('loyalty')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            sortBy === 'loyalty'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          ⭐ By Loyalty
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead className='border-b-2 dark:border-gray-600'>
            <tr>
              <th className='pb-3 font-bold'>Rank</th>
              <th className='pb-3 font-bold'>Player</th>
              <th className='pb-3 font-bold text-right'>Orders</th>
              <th className='pb-3 font-bold text-right'>Total Spent</th>
              <th className='pb-3 font-bold text-right'>Loyalty Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr
                key={index}
                className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                  entry.rank === 1 ? 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20' : ''
                }`}
              >
                <td className='py-3 font-bold text-lg'>
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'} {entry.rank}
                </td>
                <td className='py-3'>You {entry.rank === 1 && '👑'}</td>
                <td className='py-3 text-right'>{entry.orders}</td>
                <td className='py-3 text-right font-bold text-green-600 dark:text-green-400'>
                  €{entry.totalSpent.toFixed(2)}
                </td>
                <td className='py-3 text-right'>{entry.loyaltyPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {entries.length === 0 && (
        <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
          <p className='text-lg'>No stats yet. Start shopping!</p>
        </div>
      )}
    </div>
  );
};
