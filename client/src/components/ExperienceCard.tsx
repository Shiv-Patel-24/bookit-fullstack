// import { Link } from 'react-router-dom';
// import { Experience } from '../types';

// interface Props {
//   experience: Experience;
// }

// const ExperienceCard = ({ experience }: Props) => {
//   return (
//     <Link to={`/experience/${experience._id}`}>
//       <div className="card group">
//         <div className="relative h-64 overflow-hidden">
//           <img 
//             src={experience.image} 
//             alt={experience.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//           <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
//             <span className="text-yellow-500">★</span>
//             <span className="ml-1 font-semibold">{experience.rating}</span>
//           </div>
//           <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//             {experience.category}
//           </div>
//         </div>
        
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
//             {experience.title}
//           </h3>
          
//           <div className="flex items-center text-gray-600 mb-3">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
//             </svg>
//             <span className="text-sm">{experience.location}</span>
//             <span className="mx-2">•</span>
//             <span className="text-sm">{experience.duration}</span>
//           </div>
          
//           <p className="text-gray-600 mb-4 line-clamp-2">
//             {experience.description}
//           </p>
          
//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-2xl font-bold text-gray-800">₹{experience.price}</span>
//               <span className="text-gray-600 text-sm ml-1">/person</span>
//             </div>
//             <button className="btn-primary text-sm py-2">
//               View Details
//             </button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ExperienceCard;


import { Link } from 'react-router-dom';
import { Experience } from '../types';

interface Props {
  experience: Experience;
}

const ExperienceCard = ({ experience }: Props) => {
  return (
    <Link to={`/experience/${experience._id}`} className="block">
      <div className="card group cursor-pointer transform hover:-translate-y-2 transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={experience.image} 
            alt={experience.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="font-bold text-sm">{experience.rating.toFixed(1)}</span>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
            {experience.category}
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold mb-1 line-clamp-1">
              {experience.title}
            </h3>
            <div className="flex items-center text-white/90 text-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span>{experience.location}</span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
            {experience.description}
          </p>

          {/* Duration Tag */}
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{experience.duration}</span>
          </div>
          
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Starting from</div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">₹{experience.price.toLocaleString()}</span>
                <span className="text-gray-500 text-sm ml-1">/person</span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
