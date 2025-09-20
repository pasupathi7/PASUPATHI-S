
import React from 'react';
import { Hotel } from '../types';
import StarRating from './StarRating';

interface HotelDetailProps {
  hotel: Hotel;
  onClose: () => void;
}

const HotelDetail: React.FC<HotelDetailProps> = ({ hotel, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close hotel details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <div className="relative h-72">
           <img src={hotel.imageUrl} alt={`Beautiful view from ${hotel.name}`} className="w-full h-full object-cover rounded-t-2xl" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold text-white shadow-text">{hotel.name}</h2>
                <div className="flex items-center mt-2">
                    <StarRating rating={hotel.rating} />
                    <span className="text-white ml-2 font-semibold">{hotel.rating.toFixed(1)} / 5.0</span>
                </div>
           </div>
        </div>
        
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <p className="text-lg text-gray-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {hotel.location}, Chennai
                </p>
                <div className="text-2xl font-bold text-indigo-600">
                    ${hotel.pricePerNight}
                    <span className="text-sm font-normal text-gray-500"> / night</span>
                </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{hotel.description}</p>
            
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-600">
                {hotel.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                    Book Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
