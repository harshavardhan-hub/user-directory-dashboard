import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSearchTerm } from '@/store/slices/userSlice';
import { Input } from './ui/Input';
import { FavoritesFilterButton } from './FavoritesFilterButton';

export const SearchFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm, users, showFavoritesOnly, favorites } = useSelector((state: RootState) => state.users);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  // Count filtered results
  const filteredCount = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFavorites = !showFavoritesOnly || favorites.includes(user.id);
    
    return matchesSearch && matchesFavorites;
  }).length;

  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Users
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
              >
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Favorites Filter Button */}
        <div className="flex flex-col justify-end">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter Options
          </label>
          <FavoritesFilterButton />
        </div>
      </div>
      
      {/* Results summary */}
      {(searchTerm || showFavoritesOnly) && (
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Found {filteredCount} user{filteredCount !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
          {showFavoritesOnly && ' in favorites'}
        </div>
      )}
    </div>
  );
};
