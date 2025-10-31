import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingAPI, promoAPI } from '../services/api';
import PriceBreakdown from '../components/PriceBreakdown';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, selectedDate, selectedTime, guests } = location.state || {};

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!experience) {
    navigate('/');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePromoCode = async () => {
    if (!promoCode.trim()) return;
    
    try {
      setPromoError('');
      const totalAmount = experience.price * guests;
      const response = await promoAPI.validate(promoCode, totalAmount);
      
      if (response.success && response.data) {
        setDiscount(response.data.discount);
        alert(`Promo code applied! You saved ₹${response.data.discount}`);
      }
    } catch (err: any) {
      setPromoError(err.response?.data?.message || 'Invalid promo code');
      setDiscount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userName || !formData.userEmail || !formData.userPhone) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        experienceId: experience._id,
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPhone: formData.userPhone,
        date: selectedDate,
        timeSlot: selectedTime,
        numberOfGuests: guests,
        totalPrice: experience.price * guests - discount,
        promoCode: promoCode || undefined,
        discount: discount || undefined,
      };

      const booking = await bookingAPI.create(bookingData);
      navigate('/result', { state: { booking, success: true } });
    } catch (err: any) {
      navigate('/result', { 
        state: { 
          success: false, 
          error: err.response?.data?.message || 'Booking failed' 
        } 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Your Details</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Promo Code</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="input-field flex-1"
                  />
                  <button
                    type="button"
                    onClick={handlePromoCode}
                    className="btn-secondary whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-red-600 text-sm mt-2">{promoError}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Try: SAVE10, FLAT100, WELCOME20, FIRST50
                </p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
              
              <img 
                src={experience.image} 
                alt={experience.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h4 className="font-semibold text-gray-800 mb-2">{experience.title}</h4>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-semibold">
                    {new Date(selectedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-semibold">{guests}</span>
                </div>
              </div>

              <PriceBreakdown 
                price={experience.price} 
                guests={guests} 
                discount={discount} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
