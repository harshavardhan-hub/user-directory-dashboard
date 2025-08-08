import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedUser, toggleFavorite } from '@/store/slices/userSlice';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

export const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser, favorites } = useSelector((state: RootState) => state.users);
  
  const handleClose = () => {
    dispatch(setSelectedUser(null));
  };
  
  const handleToggleFavorite = () => {
    if (selectedUser) {
      dispatch(toggleFavorite(selectedUser.id));
    }
  };

  const handleViewFullProfile = () => {
    if (selectedUser) {
      navigate(`/users/${selectedUser.id}`);
      handleClose();
    }
  };
  
  if (!selectedUser) return null;
  
  const isFavorite = favorites.includes(selectedUser.id);

  return (
    <Modal
      isOpen={!!selectedUser}
      onClose={handleClose}
      title="User Details"
    >
      <div className="flex flex-col items-center">
        {/* User Avatar */}
        <div className="relative mb-6">
          <img
            src={selectedUser.avatar}
            alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${selectedUser.first_name}+${selectedUser.last_name}&background=3b82f6&color=fff&size=128`;
            }}
          />
          {isFavorite && (
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2">
              <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedUser.first_name} {selectedUser.last_name}
          </h2>
          
          <div className="flex items-center justify-center mb-2">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <a 
              href={`mailto:${selectedUser.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {selectedUser.email}
            </a>
          </div>
          
          <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            User ID: {selectedUser.id}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant={isFavorite ? "secondary" : "outline"}
            onClick={handleToggleFavorite}
            className="flex-1 flex items-center justify-center"
          >
            {isFavorite ? (
              <>
                <svg className="w-5 h-5 mr-2 fill-current text-red-500" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Remove from Favorites
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Favorites
              </>
            )}
          </Button>
          
          <Button 
            variant="primary" 
            onClick={handleViewFullProfile}
            className="flex-1 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            View Full Profile
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
