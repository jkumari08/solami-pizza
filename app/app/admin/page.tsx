'use client';

import { useState, useEffect } from 'react';
import { getInventory, saveInventory, getOrders, MenuItem, Order, getLoyaltyPoints } from '@/src/util/inventory';
import { AchievementsPanel } from '@/src/components/AchievementsPanel';
import { Leaderboard } from '@/src/components/Leaderboard';
import Link from 'next/link';

export default function AdminPage() {
  const [inventory, setInventory] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for hydration
      setInventory(getInventory());
      setOrders(getOrders());
      setIsLoaded(true);
    };
    loadData();
  }, []);

  const updateItemStock = (itemId: string, newStock: number) => {
    const updated = inventory.map(item =>
      item.id === itemId ? { ...item, stock: Math.max(0, newStock) } : item
    );
    setInventory(updated);
    saveInventory(updated);
    setEditingId(null);
  };

  const restockItem = (itemId: string, amount: number) => {
    const item = inventory.find(i => i.id === itemId);
    if (item) {
      updateItemStock(itemId, item.stock + amount);
    }
  };

  if (!isLoaded) {
    return (
      <main className='min-h-screen bg-red-500 dark:bg-red-900 p-4'>
        <div className='max-w-7xl mx-auto py-8'>
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-2xl border-solid border border-black dark:border-gray-600 p-6'>
            <p className='text-center'>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  const totalOrders = orders.length;
  const confirmedOrders = orders.filter(o => o.status === 'confirmed').length;
  const totalRevenue = orders
    .filter(o => o.status === 'confirmed')
    .reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders
    .filter(o => o.status === 'confirmed')
    .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const loyaltyPoints = getLoyaltyPoints();

  return (
    <main className='min-h-screen bg-red-500 dark:bg-red-900 p-4'>
      <div className='max-w-7xl mx-auto py-8'>
        {/* Navigation */}
        <div className='mb-6'>
          <Link href='/' className='inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-lg'>
            Back to Shop
          </Link>
        </div>

        {/* Analytics Dashboard */}
        <div className='grid grid-cols-5 gap-4 mb-6'>
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>Total Orders</p>
            <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>{totalOrders}</p>
          </div>
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>Confirmed Orders</p>
            <p className='text-3xl font-bold text-green-600 dark:text-green-400'>{confirmedOrders}</p>
          </div>
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>Total Revenue</p>
            <p className='text-3xl font-bold text-green-600 dark:text-green-400'>€{totalRevenue.toFixed(2)}</p>
          </div>
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-4'>
            <p className='text-gray-600 dark:text-gray-400 text-sm'>Items Sold</p>
            <p className='text-3xl font-bold text-orange-600 dark:text-orange-400'>{totalItemsSold}</p>
          </div>
          <div className='bg-gradient-to-r from-yellow-300 to-yellow-200 dark:from-yellow-700 dark:to-yellow-600 shadow-md rounded-lg p-4 border-2 border-yellow-500'>
            <p className='text-yellow-900 dark:text-yellow-100 text-sm font-semibold'>Loyalty Points</p>
            <p className='text-3xl font-bold text-yellow-900 dark:text-yellow-100'>⭐ {loyaltyPoints}</p>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-6 mb-6'>
          {/* Inventory Management */}
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-2xl border-solid border border-black dark:border-gray-600 p-6'>
            <h2 className='text-2xl font-bold mb-4'>Inventory Management</h2>

            <div className='space-y-4'>
              {inventory.map(item => (
                <div key={item.id} className='border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition dark:bg-gray-700'>
                  <div className='flex justify-between items-start mb-2'>
                    <div>
                      <h3 className='font-bold text-lg'>{item.name}</h3>
                      <p className='text-sm text-gray-600 dark:text-gray-400'>{item.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded font-semibold ${
                      item.stock > 50 ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      item.stock > 20 ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {item.stock} in stock
                    </span>
                  </div>

                  <div className='flex gap-2 items-center'>
                    {editingId === item.id ? (
                      <>
                        <input
                          type='number'
                          value={editStock}
                          onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                          className='border dark:border-gray-600 dark:bg-gray-600 rounded px-2 py-1 w-20'
                        />
                        <button
                          onClick={() => updateItemStock(item.id, editStock)}
                          className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm'
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className='bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm'
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(item.id);
                            setEditStock(item.stock);
                          }}
                          className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => restockItem(item.id, 10)}
                          className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm'
                        >
                          +10
                        </button>
                        <button
                          onClick={() => restockItem(item.id, 50)}
                          className='bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm'
                        >
                          +50
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className='bg-white dark:bg-gray-800 shadow-md rounded-2xl border-solid border border-black dark:border-gray-600 p-6'>
            <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>

            <div className='space-y-3 max-h-96 overflow-y-auto'>
              {orders.length === 0 ? (
                <p className='text-gray-600 dark:text-gray-400 text-center py-4'>No orders yet</p>
              ) : (
                orders.slice(0, 10).map(order => (
                  <div key={order.id} className='border dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-700'>
                    <div className='flex justify-between items-start mb-2'>
                      <div>
                        <p className='font-semibold text-sm'>{order.id.slice(0, 8)}</p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          {new Date(order.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${
                        order.status === 'confirmed' ? 'bg-green-600' :
                        order.status === 'pending' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className='text-sm mb-2'>
                      <p className='font-semibold'>€{order.total.toFixed(2)}</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>
                        {order.items.length} item(s)
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {orders.length > 10 && (
              <p className='text-center text-xs text-gray-600 dark:text-gray-400 mt-4'>
                Showing 10 of {orders.length} orders
              </p>
            )}
          </div>
        </div>

        {/* Popular Items */}
        <div className='mt-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl border-solid border border-black dark:border-gray-600 p-6 mb-6'>
          <h2 className='text-2xl font-bold mb-4'>Popular Items</h2>

          <div className='grid grid-cols-3 gap-4'>
            {inventory.map(item => {
              const itemSales = orders
                .filter(o => o.status === 'confirmed')
                .reduce((sum, o) => sum + (o.items.find(i => i.menuItemId === item.id)?.quantity || 0), 0);
              
              return (
                <div key={item.id} className='border dark:border-gray-700 rounded-lg p-4 text-center dark:bg-gray-700'>
                  <p className='font-bold text-lg'>{item.name}</p>
                  <p className='text-3xl font-bold text-blue-600 dark:text-blue-400 my-2'>{itemSales}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>units sold</p>
                  <p className='text-sm mt-2 text-gray-600 dark:text-gray-400'>
                    Revenue: €{(itemSales * item.price).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements Section */}
        <div className='mb-6'>
          <AchievementsPanel />
        </div>

        {/* Leaderboard Section */}
        <div className='mb-6'>
          <Leaderboard />
        </div>
      </div>
    </main>
  );
}
