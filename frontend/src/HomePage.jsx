import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  // Fetch location and show location-based notifications/updates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
          // Fetch notifications/updates based on location
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Failed to fetch location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleReport = () => {
    navigate('/report'); // Redirect to the report page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to the Store Issue Reporting System</h1>

      {/* Notifications/Updates Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Notifications & Updates</h2>
        <p className="text-lg">Location: {location}</p>
        <p className="mt-2">
          {/* Example notification */}
          Check out the recent store updates in your area!
        </p>
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
