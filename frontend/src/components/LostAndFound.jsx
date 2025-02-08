import React, { useState, useEffect } from 'react';
import Card from './Card'; // Import the reusable Card component
import { useNavigate } from 'react-router-dom';

function LostAndFound({ area }) {
  const [lostAndFoundItems, setLostAndFoundItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the lost and found items from the JSON file
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setLostAndFoundItems(data.lostAndFound);
      })
      .catch((error) => console.error('Error fetching lost and found items:', error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/discussion/${id}`); // Navigate to the card detail page
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Lost and Found</h2>
      {lostAndFoundItems.length > 0 ? (
        <div className="space-y-4"> {/* Changed to space-y-4 to create vertical space between cards */}
          {lostAndFoundItems.map((item) => (
            <Card
              key={item.id}
              image={item.imgUrl} // Ensure you have the image URL in your data
              title={item.title}
              description={item.description}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No lost and found items available.</p>
      )}
    </div>
  );
}

export default LostAndFound;
