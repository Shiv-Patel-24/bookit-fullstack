// const LoadingSpinner = () => {
//   return (
//     <div className="flex items-center justify-center min-h-[400px]">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
//     </div>
//   );
// };

// export default LoadingSpinner;


const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px]">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-blue-100 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <p className="mt-6 text-gray-600 font-medium animate-pulse">Loading experiences...</p>
    </div>
  );
};

export default LoadingSpinner;
