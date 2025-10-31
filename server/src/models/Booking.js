const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  experienceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Experience', 
    required: true 
  },
  userName: { type: String, required: true },
  userEmail: { 
    type: String, 
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  userPhone: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  numberOfGuests: { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  promoCode: { type: String },
  discount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['confirmed', 'pending', 'cancelled'], 
    default: 'confirmed' 
  },
  bookingReference: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
