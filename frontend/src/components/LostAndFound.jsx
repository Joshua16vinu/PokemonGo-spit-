import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore
import Card from './Card'; // Reusable Card component

function LostAndFound() {
  const [lostAndFoundItems, setLostAndFoundItems] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the "reports" collection from Firestore
        const reportsCollection = collection(db, 'reports');
        const querySnapshot = await getDocs(reportsCollection);

        const filteredItems = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          // Only push items where the issueType is "store_issue"
          if (data.issueType === "lnf") {
            filteredItems.push({
              id: data.reportId,
              image: data.imageUrl,
              title: data.title || "unknown",
              description: data.location,
              
            });
          }
        });

        setLostAndFoundItems(filteredItems); // Set the filtered items in state
      } catch (error) {
        console.error('Error fetching lost and found items from Firebase:', error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, [db]);

  const handleCardClick = (id) => {
    navigate(`/discussion/${id}`); // Navigate to the card detail page
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Lost and Found</h2>
      {lostAndFoundItems.length > 0 ? (
        <div className="space-y-4"> {/* Vertical space between cards */}
          {lostAndFoundItems.map((item) => (
            <Card
              key={item.id}
              image={item.imgUrl} // Assuming 'imgUrl' is a field in Firestore
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
