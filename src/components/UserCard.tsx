import React from 'react';
import { User } from '@/types/user';
import { Button } from './ui/Button';

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (userId: number) => void;
  onViewDetails: (user: User) => void;
  onViewUserPage?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onViewUserPage,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-105 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center">
        {/* User Photo */}
        <div className="relative mb-4">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-600"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=3b82f6&color=fff&size=96`;
            }}
          />
          {/* Favorite indicator */}
          {isFavorite && (
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* User Name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
          {user.first_name} {user.last_name}
        </h3>
        
        {/* User Email */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center text-sm">
          {user.email}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleFavorite(user.id)}
              className="flex-1 flex items-center justify-center"
            >
              {isFavorite ? (
                <svg className="w-4 h-4 mr-1 fill-current text-red-500" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              onClick={() => onViewDetails(user)}
              className="flex-1"
            >
              Quick View
            </Button>
          </div>
          
          {onViewUserPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewUserPage}
              className="w-full"
            >
              View Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
