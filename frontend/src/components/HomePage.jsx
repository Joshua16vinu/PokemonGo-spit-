import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, LayoutDashboard, Plus } from 'lucide-react';
import OtherNotifications from './OtherNotifications';
import LostAndFound from './LostAndFound';
import MapView from './MapView';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../firebase'; // Firebase authentication instance
import { useAuth } from './AuthContext'; // Assuming you have AuthContext to manage authentication state

function HomePage() {
  const [location, setLocation] = useState(null);
  const [area, setArea] = useState('Fetching location...');
  const [viewMode, setViewMode] = useState('dashboard');
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use logout function from AuthContext (if using context to manage auth)

  // Reverse Geocoding Function to fetch area name based on latitude and longitude
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
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
    navigate('/report');
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      logout(); // Update auth state in context
      navigate('/'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const eventLocations = [
    { latitude: 20.5937, longitude: 78.9629, description: 'Event 1' },
    { latitude: 19.076, longitude: 72.8777, description: 'Event 2' },
  ];

  const lostAndFoundLocations = [
    { latitude: 22.5726, longitude: 88.3639, description: 'Lost Item 1' },
    { latitude: 13.0827, longitude: 80.2707, description: 'Found Item 1' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section with new layout */}
      <div className="w-full bg-slate-900 border-b border-slate-800 p-6">
        <div className="flex justify-between max-w-[1400px] mx-auto">
          {/* Title only shown in dashboard mode, aligned to the left */}
          {viewMode === 'dashboard' && (
            <h1 className="text-3xl font-bold">PokemonGo! Issue Reporting System</h1>
          )}
          
          {/* Icon Navigation aligned to the right */}
          <div className="flex gap-4 ml-auto">
            <button
              aria-label="Map View"
              className={`p-3 rounded-md transition-colors ${
                viewMode === 'map' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-800'
              }`}
              onClick={() => setViewMode('map')}
            >
              <Map size={24} />
            </button>
            <button
              aria-label="Dashboard View"
              className={`p-3 rounded-md transition-colors ${
                viewMode === 'dashboard' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-800'
              }`}
              onClick={() => setViewMode('dashboard')}
            >
              <LayoutDashboard size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="p-8">
        {viewMode === 'dashboard' ? (
          <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:w-3/4 w-full md:pr-4 mb-6 md:mb-0">
              <OtherNotifications />
            </div>
            <div className="md:w-1/3 w-full md:pl-4">
              <LostAndFound area={area} />
            </div>
          </div>
        ) : (
          <div className="mt-8">
           
            <MapView
              userLocation={location}
              eventLocations={eventLocations}
              lostAndFoundLocations={lostAndFoundLocations}
            />
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleReport}
        aria-label="Report Issue"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <Plus size={24} />
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-16 right-6 bg-red-600 hover:bg-red-700 text-white font-bold p-4 rounded-full shadow-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;