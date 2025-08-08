import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setShowFavoritesOnly } from '@/store/slices/userSlice';
import { Button } from './ui/Button';

export const FavoritesFilterButton: React.FC = () => {
  const dispatch = useDispatch();
  const { showFavoritesOnly, favorites, users } = useSelector((state: RootState) => state.users);

  const handleToggle = () => {
    dispatch(setShowFavoritesOnly(!showFavoritesOnly));
  };

  // Count of favorite users
  const favoriteUsersCount = users.filter(user => favorites.includes(user.id)).length;

  return (
    <div className="flex items-center gap-3">
      <Button
        variant={showFavoritesOnly ? "primary" : "outline"}
        size="sm"
        onClick={handleToggle}
        className="flex items-center gap-2"
        disabled={favorites.length === 0}
      >
        {showFavoritesOnly ? (
          <>
            <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Show All Users
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Show Favorites Only
            {favoriteUsersCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                {favoriteUsersCount}
              </span>
            )}
          </>
        )}
      </Button>
      
      {/* Info text */}
      {favorites.length === 0 && (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          No favorites yet. Click ❤️ on users to add favorites.
        </span>
      )}
    </div>
  );
};
