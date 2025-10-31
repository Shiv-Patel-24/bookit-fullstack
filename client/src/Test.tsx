const Test = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">
          Tailwind CSS is Working! ✅
        </h1>
        <p className="text-gray-600 mb-6">
          If you can see this styled correctly, Tailwind v3 is installed successfully.
        </p>
        <button className="btn-primary w-full">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default Test;
