'use client';

import { useState, useMemo } from 'react';
import { MenuItem, getAverageRating } from '@/src/util/inventory';

interface SearchFilterProps {
  items: MenuItem[];
  onFiltered: (items: MenuItem[]) => void;
}

type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating' | 'popularity';

export const SearchFilter = ({ items, onFiltered }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category || 'Uncategorized'));
    return Array.from(cats).sort();
  }, [items]);

  // Filter and sort items
  const filtered = useMemo(() => {
    let result = items;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.category && item.category.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => {
          const ratingA = getAverageRating(a.id).average;
          const ratingB = getAverageRating(b.id).average;
          return ratingB - ratingA;
        });
        break;
      case 'name':
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [items, searchQuery, selectedCategory, sortBy]);

  // Update parent when filtered items change
  useMemo(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-4 space-y-4'>
      {/* Search Box */}
      <div>
        <label className='block text-sm font-semibold mb-2'>🔍 Search</label>
        <input
          type='text'
          placeholder='Search by name or category...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      {/* Category Filter */}
      <div>
        <label className='block text-sm font-semibold mb-2'>📁 Category</label>
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Dropdown */}
      <div>
        <label className='block text-sm font-semibold mb-2'>⬆️⬇️ Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className='w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='name'>Name (A-Z)</option>
          <option value='price-asc'>Price (Low to High)</option>
          <option value='price-desc'>Price (High to Low)</option>
          <option value='rating'>Top Rated</option>
        </select>
      </div>

      {/* Results Counter */}
      <div className='text-sm text-gray-600'>
        Showing <span className='font-bold text-blue-600'>{filtered.length}</span> of{' '}
        <span className='font-bold'>{items.length}</span> items
      </div>
    </div>
  );
};
