const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeSlots: [{
    time: { type: String, required: true },
    available: { type: Number, required: true, default: 10 },
    booked: { type: Number, default: 0 }
  }]
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  image: { type: String, required: true },
  category: { type: String, required: true },
  highlights: [String],
  slots: [slotSchema]
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
