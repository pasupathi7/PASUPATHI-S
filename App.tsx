
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchHotels } from './services/geminiService';
import { Hotel, FilterSort } from './types';
import Header from './components/Header';
import HotelCard from './components/HotelCard';
import HotelDetail from './components/HotelDetail';
import Spinner from './components/Spinner';
import FilterBar from './components/FilterBar';

const App: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [currentSort, setCurrentSort] = useState<FilterSort>(FilterSort.RATING_DESC);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedHotels = await fetchHotels();
        setHotels(fetchedHotels);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadHotels();
  }, []);

  const sortedHotels = useMemo(() => {
    return [...hotels].sort((a, b) => {
      switch (currentSort) {
        case FilterSort.PRICE_ASC:
          return a.pricePerNight - b.pricePerNight;
        case FilterSort.PRICE_DESC:
          return b.pricePerNight - a.pricePerNight;
        case FilterSort.RATING_DESC:
        default:
          return b.rating - a.rating;
      }
    });
  }, [hotels, currentSort]);

  const handleSelectHotel = useCallback((hotel: Hotel) => {
    setSelectedHotel(hotel);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedHotel(null);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-semibold text-red-700 mt-6">Oops! Something went wrong.</h2>
          <p className="text-gray-500 mt-2">{error}</p>
          <p className="text-gray-500 mt-1">Please ensure your Gemini API key is configured correctly.</p>
        </div>
      );
    }
    return (
        <>
            <FilterBar currentSort={currentSort} onSortChange={setCurrentSort} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedHotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} onSelect={handleSelectHotel} />
                ))}
            </div>
        </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      {selectedHotel && <HotelDetail hotel={selectedHotel} onClose={handleCloseDetail} />}
    </div>
  );
};

export default App;
