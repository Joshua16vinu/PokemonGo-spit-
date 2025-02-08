import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('Fetching location...');
  const navigate = useNavigate();

  // Reverse Geocoding Function (You can use any geocoding API, this is a placeholder)
  const fetchAreaName = async (latitude, longitude) => {
    try {
      // Example API call (use a real API here)
      const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
      const data = await response.json();
      setArea(data.city || 'Unknown Location'); // Extract city or area name from API response
    } catch (error) {
      console.error('Error fetching area name:', error);
      setArea('Unable to determine location');
    }
  };

  // Fetch location and show area-based notifications/updates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
          fetchAreaName(latitude, longitude); // Fetch area name based on coordinates
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
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Store Issue Reporting System</h1>

      {/* Notifications/Updates Section with Image */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 flex">
        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Notifications & Updates</h2>
          <p className="text-lg">Location: {area}</p>
          <p className="mt-2">
            {/* Example notification */}
            Check out the recent store updates in your area!
          </p>
        </div>

        {/* Image Section */}
        <div className="w-1/3 pl-4">
          <img
            src="https://via.placeholder.com/300" // Replace with a real image URL
            alt="Store"
            className="w-full h-auto rounded-lg shadow-lg"
          />
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
