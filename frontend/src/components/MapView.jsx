import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default Icon for Leaflet (To fix missing marker icons issue)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapView({ userLocation, eventLocations, lostAndFoundLocations }) {
  // Center the map on the user's location or use a default center
  const defaultPosition = [20.5937, 78.9629]; // Default position (India) if user location is not available
  const userPosition = userLocation ? [userLocation.latitude, userLocation.longitude] : defaultPosition;

  // Updated event descriptions
  const updatedEventLocations = [
    { ...eventLocations[0], description: 'Event 1: AI Summit' },
    { ...eventLocations[1], description: 'Event 2' },
    { latitude: 22.5726, longitude: 88.3639, description: 'Event 3' }
  ];

  return (
    <div className="map-container" style={{ height: '600px', width: '100%' }}>
      <MapContainer center={userPosition} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userPosition}>
            <Tooltip permanent direction="top" offset={[0, -20]} className="custom-tooltip">
              Your Location
            </Tooltip>
          </Marker>
        )}

        {/* Event Locations */}
        {updatedEventLocations.map((event, index) => (
          <Marker 
            key={index} 
            position={[event.latitude, event.longitude]}
          >
            <Tooltip permanent direction="top" offset={[0, -20]} className="custom-tooltip">
              {event.description}
            </Tooltip>
          </Marker>
        ))}

        {/* Lost and Found Locations */}
        {lostAndFoundLocations.map((item, index) => (
          <Marker 
            key={index} 
            position={[item.latitude, item.longitude]}
          >
            <Tooltip permanent direction="top" offset={[0, -20]} className="custom-tooltip">
              {item.description}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom styles for tooltips */}
      <style>
        {`
          .custom-tooltip {
            background-color: rgba(0, 0, 0, 0.8);
            border: none;
            border-radius: 4px;
            padding: 4px 8px;
            color: white;
            font-weight: 500;
          }
          .custom-tooltip::before {
            border-top-color: rgba(0, 0, 0, 0.8);
          }
        `}
      </style>
    </div>
  );
}

export default MapView;