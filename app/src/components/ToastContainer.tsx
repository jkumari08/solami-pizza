'use client';

import { useToast } from '@/src/context/ToastContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const bgColorMap = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-yellow-600',
  };

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${bgColorMap[toast.type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-64 animate-fade-in`}
        >
          <span className='text-lg font-bold'>{iconMap[toast.type]}</span>
          <span className='flex-1'>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className='text-white hover:opacity-70 font-bold text-lg'
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
