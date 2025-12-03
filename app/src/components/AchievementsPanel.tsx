'use client';

import { useState, useEffect } from 'react';
import { getAchievements, checkAchievements, getOrders, getLoyaltyPoints, getReviews } from '@/src/util/inventory';
import { Achievement } from '@/src/util/inventory';

export const AchievementsPanel = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get current stats
    const orders = getOrders();
    const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const loyaltyPoints = getLoyaltyPoints();
    const reviews = getReviews();

    // Check and unlock achievements
    checkAchievements(
      orders.length,
      totalSpent,
      reviews.length,
      loyaltyPoints
    );

    // Get updated achievements
    setAchievements(getAchievements());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-3xl font-bold'>🏆 Achievements</h2>
        <span className='text-lg font-semibold text-blue-600 dark:text-blue-400'>
          {unlockedCount} / {achievements.length} Unlocked
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              achievement.unlocked
                ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20'
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 opacity-70'
            }`}
          >
            <div className='flex items-start gap-3'>
              <span className='text-4xl'>{achievement.icon}</span>
              <div className='flex-1'>
                <h3 className='font-bold text-lg'>{achievement.name}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  {achievement.description}
                </p>
                {achievement.unlocked && achievement.unlockedAt && (
                  <p className='text-xs text-green-600 dark:text-green-400 font-semibold'>
                    ✓ Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {unlockedCount === 0 && (
        <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
          <p className='text-lg'>Start shopping to unlock achievements!</p>
        </div>
      )}
    </div>
  );
};
