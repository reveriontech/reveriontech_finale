import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

const ErrorMessage = ({ title = 'An error occurred', message = 'Please try again later' }) => {
  return (
    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <AiOutlineWarning className="w-5 h-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;