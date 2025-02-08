import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtherNotifications from './OtherNotifications';
import LostAndFound from './LostAndFound';

function HomePage() {
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('Fetching location...');
  const navigate = useNavigate();

  // Reverse Geocoding Function (Fetch Area Name)
  const fetchAreaName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
      const data = await response.json();
      if (data.city) {
        setArea(data.city);
      } else {
        setArea('Unknown Location');
      }
    } catch (error) {
      console.error('Error fetching area name:', error);
      setArea('Unable to determine location');
    }
  };

  // Fetch the User's Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
          fetchAreaName(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setArea('Failed to fetch location.');
        }
      );
    } else {
      setArea('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleReport = () => {
    navigate('/report'); // Redirect to the report page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">PokemonGo! Issue Reporting System</h1>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Section - Other Notifications (Takes up more space on wider screens) */}
        <div className="md:w-3/4 w-full md:pr-4 mb-6 md:mb-0">
          <OtherNotifications />
        </div>

        {/* Right Section - Lost and Found (Takes up less space) */}
        <div className="md:w-1/3 w-full md:pl-4">
          <LostAndFound area={area} />
        </div>
      </div>

      {/* Floating "+" Button */}
      <button
        onClick={handleReport}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold p-5 rounded-full shadow-lg"
      >
        +
      </button>
    </div>
  );
}

export default HomePage;
