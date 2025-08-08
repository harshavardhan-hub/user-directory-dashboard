import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className={`${sizes[size]} border-4 border-gray-300 border-t-primary-600 rounded-full animate-spin`}
      />
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
};
