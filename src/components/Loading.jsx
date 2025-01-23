import React from 'react';


const Loading = ({ message = "Loading" }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bouncing-loader">
        <div className="ball ball-1"></div>
        <div className="ball ball-2"></div>
        <div className="ball ball-3"></div>
      </div>
      <span className="ml-4 text-lg text-gray-700 dark:text-white">{message}</span>
    </div>
  );
};

export default Loading;
