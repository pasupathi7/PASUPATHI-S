
import React from 'react';
import { Hotel } from '../types';
import StarRating from './StarRating';

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(hotel)}
    >
      <div className="relative">
        <img className="w-full h-56 object-cover" src={hotel.imageUrl} alt={`Exterior of ${hotel.name}`} />
        <div className="absolute top-0 right-0 bg-indigo-600 text-white font-bold text-lg px-4 py-2 m-4 rounded-full">
          ${hotel.pricePerNight}<span className="text-sm font-normal">/night</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 pr-2">{hotel.name}</h3>
            <div className="flex-shrink-0">
               <StarRating rating={hotel.rating} />
            </div>
        </div>
        <p className="text-sm text-gray-500 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {hotel.location}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 3).map(amenity => (
                <span key={amenity} className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {amenity}
                </span>
            ))}
            {hotel.amenities.length > 3 && (
                <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    +{hotel.amenities.length - 3} more
                </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
