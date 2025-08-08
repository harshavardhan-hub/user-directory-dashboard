import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedUser, toggleFavorite } from '@/store/slices/userSlice';
import { UserCard } from './UserCard';
import { User } from '@/types/user';

export const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    users, 
    favorites, 
    searchTerm, 
    showFavoritesOnly // Get the new state
  } = useSelector((state: RootState) => state.users);

  // Enhanced filtering: search + favorites filter
  const filteredUsers = useMemo(() => {
    let filtered = users;
    
    // Apply search filter first
    if (searchTerm) {
      filtered = users.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply favorites filter if enabled
    if (showFavoritesOnly) {
      filtered = filtered.filter(user => favorites.includes(user.id));
    }
    
    return filtered;
  }, [users, favorites, searchTerm, showFavoritesOnly]);

  const handleToggleFavorite = (userId: number) => {
    dispatch(toggleFavorite(userId));
  };

  const handleViewDetails = (user: User) => {
    dispatch(setSelectedUser(user));
  };

  const handleViewUserPage = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  // No results state
  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {showFavoritesOnly ? (
            // Heart icon for no favorites
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          ) : (
            // Search icon for no search results
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          )}
        </svg>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {showFavoritesOnly 
            ? (favorites.length === 0 ? 'No favorite users yet' : 'No favorite users match your search')
            : 'No users found'
          }
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {showFavoritesOnly 
            ? (favorites.length === 0 
                ? 'Start adding users to your favorites by clicking the ❤️ button on user cards.'
                : 'Try adjusting your search terms or view all users.'
              )
            : 'Try adjusting your search terms.'
          }
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results info */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>
          Showing {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
          {showFavoritesOnly && (
            <span className="ml-1">
              (favorites only)
              <svg className="w-4 h-4 inline ml-1 fill-current text-red-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </span>
          )}
        </div>
        
        {searchTerm && (
          <div>
            Search: "{searchTerm}"
          </div>
        )}
      </div>

      {/* User grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isFavorite={favorites.includes(user.id)}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={handleViewDetails}
            onViewUserPage={() => handleViewUserPage(user.id)}
          />
        ))}
      </div>
    </div>
  );
};
