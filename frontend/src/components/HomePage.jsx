import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, LayoutDashboard, Plus } from 'lucide-react';
import OtherNotifications from './OtherNotifications';
import LostAndFound from './LostAndFound';
import MapView from './MapView';
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../firebase'; // Firebase authentication instance
import { useAuth } from './AuthContext'; // Assuming you have AuthContext to manage authentication state
import "./homefile.css"

function HomePage() {
  const [location, setLocation] = useState(null);
  const [area, setArea] = useState('Fetching location...');
  const [viewMode, setViewMode] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  // Reverse Geocoding Function
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

  const handleReports = () => {
    navigate('/report');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a search term.');
      return;
    }
    console.log(searchQuery);
    navigate(`/results?query=${searchQuery}`);
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/search-suggestions?query=${query}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.length === 0) {
        setSuggestions(['No matches found']);
      } else {
        setSuggestions(data);
      }

      setShowSuggestions(true);
    } catch (err) {
      console.error('Error fetching suggestions:', err.message);
      setSuggestions([`Error: ${err.message}`]);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
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
      <div className="flex ml-auto">
        <button
          aria-label="Map View"
          className={`p-3 rounded-md transition-colors m-2 ${viewMode === 'map' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-800'}`}
          onClick={() => setViewMode('map')}
        >
          <Map size={24} />
        </button>
        <button
          aria-label="Dashboard View"
          className={`p-3 rounded-md transition-colors m-2 ${viewMode === 'dashboard' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-800'}`}
          onClick={() => setViewMode('dashboard')}
        >
          <LayoutDashboard size={24} />
        </button>
      </div>

      <div className="flex-container min-h-screen p-8">
        <div className="notifications-section">
          <OtherNotifications />
        </div>
        <div className="divider"></div>
        <div className="lost-found-section">
          <LostAndFound area={area} />
        </div>
      </div>
      <h1 className="text-2xl font-semibold p-8">Trip Planning</h1>
      <div className="search-bar" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Where do you want to go?"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        {showSuggestions && suggestions.length > 0 && (
         <div className={`suggestions-dropdown ${showSuggestions ? 'show' : ''}`}>
         {suggestions.map((suggestion, index) => (
           <div
             key={index}
             className="suggestion-item"
             onClick={() => handleSuggestionClick(suggestion)}
           >
             {suggestion}
           </div>
         ))}
       </div>
       
        )}
      </div>
      <button
  onClick={handleReports}
  aria-label="Report Issue"
  className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors flex items-center justify-center overflow-hidden"
  onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
  onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
>
  {/* Pokémon Ball image */}
  <img
    src="/images/pokemon logo.png" // Replace with actual path to your Pokémon ball image
    alt="Pokémon Ball"
    className={`transition-all duration-300 transform  w-12 h-12`} // Pokémon ball image animation
  />
  
  {/* Text appears when hovered */}
  <span
    className={`transition-all duration-300 transform ${isHovered ? "size-10 translate-x-0" : "size-0 translate-x-4"} text-sm font-semibold ml-2`}
  >
    Add Report
  </span>
</button>


      <button
        onClick={handleLogout}
        className="fixed top-2 right-3 bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-full shadow-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;


