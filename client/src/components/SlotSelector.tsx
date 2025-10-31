import { Slot, TimeSlot } from '../types';

interface Props {
  slots: Slot[];
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const SlotSelector = ({ 
  slots, 
  selectedDate, 
  selectedTime, 
  onDateChange, 
  onTimeChange 
}: Props) => {
  const selectedSlot = slots.find(s => s.date === selectedDate);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Select Date</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {slots.map((slot) => {
            const date = new Date(slot.date);
            const isSelected = slot.date === selectedDate;
            
            return (
              <button
                key={slot.date}
                onClick={() => {
                  onDateChange(slot.date);
                  onTimeChange('');
                }}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="text-sm text-gray-600">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold">
                  {date.getDate()}
                </div>
                <div className="text-xs text-gray-500">
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && selectedSlot && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Select Time Slot</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selectedSlot.timeSlots.map((timeSlot: TimeSlot) => {
              const available = timeSlot.available - timeSlot.booked;
              const isSelected = timeSlot.time === selectedTime;
              const isSoldOut = available === 0;
              
              return (
                <button
                  key={timeSlot.time}
                  onClick={() => onTimeChange(timeSlot.time)}
                  disabled={isSoldOut}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    isSoldOut
                      ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                      : isSelected
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="text-lg font-bold">{timeSlot.time}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {isSoldOut ? 'Sold Out' : `${available} slots left`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotSelector;
