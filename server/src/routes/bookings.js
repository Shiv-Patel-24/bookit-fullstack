const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
  try {
    const { 
      experienceId, 
      userName, 
      userEmail, 
      userPhone, 
      date, 
      timeSlot, 
      numberOfGuests,
      totalPrice,
      promoCode,
      discount 
    } = req.body;

    // Validate required fields
    if (!experienceId || !userName || !userEmail || !userPhone || 
        !date || !timeSlot || !numberOfGuests) {
      return res.status(400).json({ 
        success: false, 
        message: 'All required fields must be provided' 
      });
    }

    // Check experience exists
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ 
        success: false, 
        message: 'Experience not found' 
      });
    }

    // Find the specific slot
    const dateSlot = experience.slots.find(s => s.date === date);
    if (!dateSlot) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid date selected' 
      });
    }

    const timeSlotObj = dateSlot.timeSlots.find(t => t.time === timeSlot);
    if (!timeSlotObj) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid time slot selected' 
      });
    }

    // Check availability
    const availableSlots = timeSlotObj.available - timeSlotObj.booked;
    if (availableSlots < numberOfGuests) {
      return res.status(400).json({ 
        success: false, 
        message: `Only ${availableSlots} slots available` 
      });
    }

    // Generate booking reference
    const bookingReference = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create booking
    const booking = await Booking.create({
      experienceId,
      userName,
      userEmail,
      userPhone,
      date,
      timeSlot,
      numberOfGuests,
      totalPrice,
      promoCode,
      discount,
      bookingReference
    });

    // Update slot availability
    timeSlotObj.booked += numberOfGuests;
    await experience.save();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      data: booking
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/bookings/:reference - Get booking by reference
router.get('/:reference', async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingReference: req.params.reference 
    }).populate('experienceId');
    
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
