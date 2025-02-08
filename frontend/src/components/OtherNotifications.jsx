import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

function OtherNotifications() {
  const navigate = useNavigate();
  const [eventNotifications, setEventNotifications] = useState([]);
  const [announcementNotifications, setAnnouncementNotifications] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setEventNotifications(data.events);
        setAnnouncementNotifications(data.announcements);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
