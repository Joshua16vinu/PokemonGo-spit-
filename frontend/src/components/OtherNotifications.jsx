import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import necessary Firebase methods
import Card from './Card';

function OtherNotifications() {
  const navigate = useNavigate();
  const [eventNotifications, setEventNotifications] = useState([]);
  const [announcementNotifications, setAnnouncementNotifications] = useState([]);
  const db = getFirestore(); // Firebase Firestore instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reports collection from Firebase Firestore
        const reportsCollection = collection(db, "reports");
        const querySnapshot = await getDocs(reportsCollection);

        const events = [];
        const announcements = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Make sure the data has all required fields
          if (data.issueType === "e") {
            events.push({
              id: data.reportId,
              image: data.imageUrl,
              title: data.title || "Unknown",
              description: data.location,
            });
          } else if(data.issueType === "ann") {
            announcements.push({
              id: data.reportId,
              image: data.imageUrl,
              title: data.title || "Unknown",
              description: data.location,
            });
          }
        });

        setEventNotifications(events);
        setAnnouncementNotifications(announcements);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, [db]);

  const handleEventCardClick = (eventId) => {
    navigate(`/discussion/${eventId}`);
  };

  const handleAnnouncementCardClick = (announcementId) => {
    navigate(`/discussion/${announcementId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Event Notifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {eventNotifications.map((event) => (
          <Card
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
            onClick={() => handleEventCardClick(event.id)}
          />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcementNotifications.map((announcement) => (
          <Card
            key={announcement.id}
            image={announcement.image}
            title={announcement.title}
            description={announcement.description}
            onClick={() => handleAnnouncementCardClick(announcement.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default OtherNotifications;
