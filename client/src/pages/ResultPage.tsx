import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, success, error } = location.state || {};

  if (!location.state) {
    navigate('/');
    return null;
  }

  if (success && booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-8">
              Your adventure is all set. We've sent a confirmation email to {booking.userEmail}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="text-sm text-gray-600 mb-2">Booking Reference</div>
              <div className="text-2xl font-bold text-primary-600 mb-6">
                {booking.bookingReference}
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-semibold">
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Time</div>
                  <div className="font-semibold">{booking.timeSlot}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Guests</div>
                  <div className="font-semibold">{booking.numberOfGuests}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Paid</div>
                  <div className="font-semibold">₹{booking.totalPrice.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => navigate('/')}
                className="btn-primary w-full"
              >
                Book Another Experience
              </button>
              <button 
                onClick={() => window.print()}
                className="btn-secondary w-full"
              >
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Booking Failed
          </h1>
          <p className="text-gray-600 mb-8">
            {error || 'Something went wrong. Please try again.'}
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => navigate(-1)}
              className="btn-primary w-full"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/')}
              className="btn-secondary w-full"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
