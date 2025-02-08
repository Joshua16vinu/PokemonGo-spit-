import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReportPage() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [status] = useState('pending'); // Status is set internally, no user input
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  // Fetch location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Failed to fetch location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    // Automatically update timestamp every time the component is rendered
    setTimestamp(new Date().toISOString());
  }, []);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location) {
      alert('Please provide all required details.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('location', location);
    formData.append('status', status);
    formData.append('timestamp', timestamp);

    try {
      // Replace 'YOUR_API_URL' with your actual API endpoint
      const response = await axios.post('YOUR_API_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Store Issue Report</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Location:</label>
            <input
              type="text"
              value={location}
              readOnly
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Upload Image:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Timestamp:</label>
            <input
              type="text"
              value={timestamp}
              readOnly
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportPage;
