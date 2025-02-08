import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

  return (
    <div className="map-container" style={{ height: '400px', width: '100%' }}>
      <MapContainer center={userPosition} zoom={5} style={{ height: '100%', width: '100%' }}>
        {/* Tile Layer (Map Background) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userPosition}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Event Locations */}
        {eventLocations.map((event, index) => (
          <Marker key={index} position={[event.latitude, event.longitude]}>
            <Popup>{event.description}</Popup>
          </Marker>
        ))}

        {/* Lost and Found Locations */}
        {lostAndFoundLocations.map((item, index) => (
          <Marker key={index} position={[item.latitude, item.longitude]}>
            <Popup>{item.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
