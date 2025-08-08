import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchUsers, clearError } from '@/store/slices/userSlice';
import { UserList } from '@/components/UserList';
import { UserModal } from '@/components/UserModal';
import { SearchFilter } from '@/components/SearchFilter';
import { Pagination } from '@/components/Pagination';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';

export const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, currentPage, totalPages, users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(fetchUsers(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchUsers(currentPage));
  };

  if (loading && currentPage === 1) {
    return <Loader size="lg" text="Loading users from ReqRes API..." />;
  }

  if (error && currentPage === 1) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Error loading users
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error}
        </p>
        <Button onClick={handleRetry}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              User Directory
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Browse and search through our user database
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Powered by ReqRes API</span>
          </div>
        </div>
        
        {/* Search/Filter Component */}
        <SearchFilter />
      </div>
      
      {/* User List */}
      <UserList />
      
      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
        totalItems={12} // ReqRes API has 12 total users
        itemsPerPage={6}
      />
      
      {/* User Detail Modal */}
      <UserModal />
    </>
  );
};
