import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchUserById, toggleFavorite } from '@/store/slices/userSlice';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';

export const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser, favorites, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
  }, [dispatch, id]);

  const handleToggleFavorite = () => {
    if (selectedUser) {
      dispatch(toggleFavorite(selectedUser.id));
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return <Loader size="lg" text="Loading user details..." />;
  }

  if (error || !selectedUser) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          User not found
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error || 'The requested user could not be found.'}
        </p>
        <Button onClick={handleGoBack}>
          Go Back to Users
        </Button>
      </div>
    );
  }

  const isFavorite = favorites.includes(selectedUser.id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center">
          <img
            src={selectedUser.avatar}
            alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
            className="w-40 h-40 rounded-full mb-6 object-cover"
          />
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedUser.first_name} {selectedUser.last_name}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {selectedUser.email}
          </p>
          
          <div className="flex space-x-4 mb-8">
            <Button
              variant={isFavorite ? "secondary" : "outline"}
              onClick={handleToggleFavorite}
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
            
            <Button variant="outline" onClick={handleGoBack}>
              Back to Users
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
