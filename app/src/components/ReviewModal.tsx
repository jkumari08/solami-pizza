'use client';

import { useState } from 'react';
import { addReview, getAverageRating } from '@/src/util/inventory';
import { useToast } from '@/src/context/ToastContext';

interface ReviewModalProps {
  menuItemId: string;
  itemName: string;
  onClose: () => void;
}

export const ReviewModal = ({ menuItemId, itemName, onClose }: ReviewModalProps) => {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = () => {
    if (!text.trim()) {
      addToast('Please write a review', 'warning');
      return;
    }

    setIsSubmitting(true);
    addReview(menuItemId, rating, text);
    addToast(`Review added! Thanks for your feedback on ${itemName}`, 'success');
    setTimeout(() => {
      onClose();
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
        <h2 className='text-2xl font-bold mb-4'>Review {itemName}</h2>

        <div className='mb-4'>
          <label className='block text-sm font-semibold mb-2'>Rating</label>
          <div className='flex gap-2'>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
          <p className='text-sm text-gray-600 mt-1'>{rating} / 5 stars</p>
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-semibold mb-2'>Your Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
            className='w-full border rounded-lg p-2 h-24'
            placeholder='What did you think about this item?'
          />
          <p className='text-xs text-gray-500 mt-1'>{text.length}/500 characters</p>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={onClose}
            className='flex-1 bg-gray-400 hover:bg-gray-600 text-white py-2 rounded-lg'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ReviewDisplayProps {
  menuItemId: string;
}

export const ReviewDisplay = ({ menuItemId }: ReviewDisplayProps) => {
  const { average, count } = getAverageRating(menuItemId);

  if (count === 0) return null;

  return (
    <div className='flex items-center gap-1 text-sm'>
      <span className='text-yellow-400'>⭐</span>
      <span className='font-semibold'>{average.toFixed(1)}</span>
      <span className='text-gray-600'>({count} {count === 1 ? 'review' : 'reviews'})</span>
    </div>
  );
};
