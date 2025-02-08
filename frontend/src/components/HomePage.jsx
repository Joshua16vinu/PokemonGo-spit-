import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtherNotifications from './OtherNotifications'; // Import for OtherNotifications component
import LostAndFound from './LostAndFound'; // Import for LostAndFound component
import MapView from './MapView'; // Import for MapView component
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../firebase'; // Firebase authentication instance
import { useAuth } from './AuthContext'; // Assuming you have AuthContext to manage authentication state

function HomePage() {
  const [location, setLocation] = useState(null); // To store user's location (latitude & longitude)
  const [area, setArea] = useState('Fetching location...'); // To store user's area name
  const navigate = useNavigate(); // For navigation between pages
  const { logout } = useAuth(); // Use logout function from AuthContext (if using context to manage auth)

  // Reverse Geocoding Function to fetch area name based on latitude and longitude
  const fetchAreaName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`); // Using geocode.xyz API for reverse geocoding
      const data = await response.json();
      if (data.city) {
        setArea(data.city); // If city name is found, update the area
      } else {
        setArea('Unknown Location'); // Handle case where city isn't available
      }
    } catch (error) {
      console.error('Error fetching area name:', error);
      setArea('Unable to determine location'); // Fallback in case of error
    }
  };

  // Fetch the user's geolocation when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude }); // Set user's location
          fetchAreaName(latitude, longitude); // Fetch area name using reverse geocoding
        },
        (error) => {
          console.error('Error fetching location:', error);
          setArea('Failed to fetch location.'); // Error handling for geolocation
        }
      );
    } else {
      setArea('Geolocation is not supported by this browser.'); // If geolocation isn't supported
    }
  }, []);

  // Handle "Report" button click to navigate to the report page
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

  // Example event and lost-and-found data (you can replace it with actual data or fetch from API)
  const eventLocations = [
    { latitude: 20.5937, longitude: 78.9629, description: 'Event 1' },
    { latitude: 19.076, longitude: 72.8777, description: 'Event 2' },
  ];

  const lostAndFoundLocations = [
    { latitude: 22.5726, longitude: 88.3639, description: 'Lost Item 1' },
    { latitude: 13.0827, longitude: 80.2707, description: 'Found Item 1' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">PokemonGo! Issue Reporting System</h1>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Section - Other Notifications */}
        <div className="md:w-3/4 w-full md:pr-4 mb-6 md:mb-0">
          <OtherNotifications />
        </div>

        {/* Right Section - Lost and Found */}
        <div className="md:w-1/3 w-full md:pl-4">
          <LostAndFound area={area} /> {/* Passing area to LostAndFound component */}
        </div>
      </div>

      {/* Map View Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Map View</h2>
        {/* Passing event and lost-and-found locations to the MapView component */}
        <MapView
          userLocation={location}
          eventLocations={eventLocations}
          lostAndFoundLocations={lostAndFoundLocations}
        />
      </div>

      {/* Floating "+" Button to report a new issue */}
      <button
        onClick={handleReport}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold p-5 rounded-full shadow-lg"
      >
        +
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
