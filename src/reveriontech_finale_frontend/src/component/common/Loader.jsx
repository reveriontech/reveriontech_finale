import React from 'react';

const Loader = ({ size = 'md', message = 'Loading...' }) => {
  // Size classes for the spinner
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} border-t-2 border-b-2 border-blue-500 rounded-full animate-spin`}></div>
      {message && <span className="mt-2 text-sm text-gray-500">{message}</span>}
    </div>
  );
};

export default Loader;