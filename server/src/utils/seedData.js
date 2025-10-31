const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Experience = require('../models/Experience');

dotenv.config();

const experiences = [
  {
    title: "Sunset Desert Safari",
    description: "Experience the magic of the desert with our sunset safari. Enjoy dune bashing, camel riding, and traditional dinner under the stars.",
    location: "Dubai, UAE",
    price: 2500,
    duration: "6 hours",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=800",
    category: "Adventure",
    highlights: [
      "Dune bashing in 4x4 vehicles",
      "Camel riding experience",
      "Traditional BBQ dinner",
      "Belly dance & Tanoura show"
    ],
    slots: [
      {
        date: "2025-11-05",
        timeSlots: [
          { time: "15:00", available: 10, booked: 0 },
          { time: "16:00", available: 10, booked: 0 }
        ]
      },
      {
        date: "2025-11-06",
        timeSlots: [
          { time: "15:00", available: 10, booked: 0 },
          { time: "16:00", available: 10, booked: 0 }
        ]
      }
    ]
  },
  {
    title: "Scuba Diving Adventure",
    description: "Discover the underwater world with our professional diving instructors. Perfect for beginners and experienced divers.",
    location: "Maldives",
    price: 4500,
    duration: "4 hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    category: "Water Sports",
    highlights: [
      "Professional instructor",
      "All equipment included",
      "Underwater photography",
      "Marine life exploration"
    ],
    slots: [
      {
        date: "2025-11-05",
        timeSlots: [
          { time: "09:00", available: 6, booked: 0 },
          { time: "14:00", available: 6, booked: 0 }
        ]
      },
      {
        date: "2025-11-06",
        timeSlots: [
          { time: "09:00", available: 6, booked: 0 },
          { time: "14:00", available: 6, booked: 0 }
        ]
      }
    ]
  },
  {
    title: "Mountain Trekking Expedition",
    description: "Challenge yourself with breathtaking mountain trails. Suitable for adventure enthusiasts.",
    location: "Himalayas, India",
    price: 3200,
    duration: "8 hours",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    category: "Trekking",
    highlights: [
      "Experienced guide",
      "Scenic viewpoints",
      "Packed lunch included",
      "Photography opportunities"
    ],
    slots: [
      {
        date: "2025-11-05",
        timeSlots: [
          { time: "06:00", available: 8, booked: 0 },
          { time: "07:00", available: 8, booked: 0 }
        ]
      },
      {
        date: "2025-11-06",
        timeSlots: [
          { time: "06:00", available: 8, booked: 0 },
          { time: "07:00", available: 8, booked: 0 }
        ]
      }
    ]
  },
  {
    title: "Hot Air Balloon Ride",
    description: "Float above stunning landscapes in a hot air balloon. Unforgettable sunrise views guaranteed.",
    location: "Cappadocia, Turkey",
    price: 5500,
    duration: "3 hours",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800",
    category: "Aerial",
    highlights: [
      "Sunrise flight",
      "Champagne toast",
      "Flight certificate",
      "Professional pilot"
    ],
    slots: [
      {
        date: "2025-11-05",
        timeSlots: [
          { time: "05:30", available: 12, booked: 0 },
          { time: "06:00", available: 12, booked: 0 }
        ]
      },
      {
        date: "2025-11-06",
        timeSlots: [
          { time: "05:30", available: 12, booked: 0 },
          { time: "06:00", available: 12, booked: 0 }
        ]
      }
    ]
  },
  {
    title: "City Food Tour",
    description: "Taste authentic local cuisine with our expert food guides. A culinary journey you won't forget.",
    location: "Bangkok, Thailand",
    price: 1800,
    duration: "5 hours",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    category: "Culinary",
    highlights: [
      "10+ food stops",
      "Local guide",
      "Street food experience",
      "Cultural insights"
    ],
    slots: [
      {
        date: "2025-11-05",
        timeSlots: [
          { time: "11:00", available: 15, booked: 0 },
          { time: "18:00", available: 15, booked: 0 }
        ]
      },
      {
        date: "2025-11-06",
        timeSlots: [
          { time: "11:00", available: 15, booked: 0 },
          { time: "18:00", available: 15, booked: 0 }
        ]
      }
    ]
  },
  {
    title: "Wildlife Safari",
    description: "Get up close with exotic wildlife in their natural habitat. Perfect for nature lovers and photographers.",
    location: "Serengeti, Tanzania",
    price: 6800,
    duration: "Full Day",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    category: "Wildlife",
    highlights: [
      "Big Five spotting",
      "Professional guide",
      "Lunch included",
      "4x4 safari vehicle"
    ],
    slots: [
      {
        date: "2025-11-05",
        timeSlots: [
          { time: "06:00", available: 8, booked: 0 },
          { time: "07:00", available: 8, booked: 0 }
        ]
      },
      {
        date: "2025-11-06",
        timeSlots: [
          { time: "06:00", available: 8, booked: 0 },
          { time: "07:00", available: 8, booked: 0 }
        ]
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Experience.deleteMany({});
    console.log('🗑️  Cleared existing data');

    await Experience.insertMany(experiences);
    console.log('✅ Seeded experiences successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDatabase();
