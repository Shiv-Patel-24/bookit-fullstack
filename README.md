# BookIt - Full Stack Experience Booking Application

A full-stack web application for booking experiences and activities, built with React, TypeScript, Node.js, and Express.

## Project Structure

The project is organized into two main directories:

- `client/` - Frontend application built with React, TypeScript, and Vite
- `server/` - Backend API built with Node.js and Express

## Features

- Browse and search experiences/activities
- View experience details and availability
- Select time slots for booking
- Price breakdown with promo code support
- Checkout and booking confirmation
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- ESLint
- PostCSS

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Input validation middleware

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shiv-Patel-24/bookit-fullstack.git
cd bookit-fullstack
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application should now be running at `http://localhost:5173` (frontend) and `http://localhost:3000` (backend API).

## Project Structure Details

### Frontend (`client/`)
- `src/components/` - Reusable React components
- `src/pages/` - Page components for different routes
- `src/services/` - API service functions
- `src/types/` - TypeScript type definitions
- `src/assets/` - Static assets like images

### Backend (`server/`)
- `src/routes/` - API route definitions
- `src/models/` - MongoDB/Mongoose models
- `src/middleware/` - Custom middleware functions
- `src/config/` - Configuration files
- `src/utils/` - Utility functions

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.