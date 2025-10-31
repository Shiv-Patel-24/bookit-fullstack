import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experienceAPI } from '../services/api';
import { Experience } from '../types';
import SlotSelector from '../components/SlotSelector';
import LoadingSpinner from '../components/LoadingSpinner';

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    if (id) fetchExperience();
  }, [id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await experienceAPI.getById(id!);
      setExperience(data);
      if (data.slots && data.slots.length > 0) {
        setSelectedDate(data.slots[0].date);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time slot');
      return;
    }

    navigate('/checkout', {
      state: {
        experience,
        selectedDate,
        selectedTime,
        guests,
      },
    });
  };

  if (loading) return <LoadingSpinner />;
  if (!experience) return <div>Experience not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {experience.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {experience.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span>{experience.location}</span>
                    <span className="mx-3">•</span>
                    <span>{experience.duration}</span>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
                  <span className="text-yellow-500 text-2xl mr-2">★</span>
                  <span className="text-2xl font-bold">{experience.rating}</span>
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">About This Experience</h2>
                <p className="text-gray-700 leading-relaxed">{experience.description}</p>
              </div>

              <div className="border-t pt-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                <ul className="space-y-3">
                  {experience.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {experience.slots && (
                <div className="border-t pt-6">
                  <SlotSelector
                    slots={experience.slots}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateChange={setSelectedDate}
                    onTimeChange={setSelectedTime}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-800">₹{experience.price}</span>
                <span className="text-gray-600 ml-2">/person</span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="input-field"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">₹{(experience.price * guests).toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="btn-primary w-full"
              >
                Continue to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
