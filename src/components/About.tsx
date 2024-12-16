import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-700 mb-4">
          Welcome to our travel website. We are dedicated to providing you with the best travel experiences.
        </p>
        <p className="text-gray-700 mb-4">
          Our team of experts works tirelessly to curate the best travel packages and experiences for you. Whether you're looking for a relaxing beach vacation or an adventurous mountain trek, we have something for everyone.
        </p>
        <p className="text-gray-700 mb-4">
          We believe that travel is not just about visiting new places, but also about creating unforgettable memories. That's why we go the extra mile to ensure that every aspect of your trip is perfect.
        </p>
        <p className="text-gray-700 mb-4">
          Thank you for choosing us as your travel partner. We look forward to helping you explore the world.
        </p>
      </div>
    </div>
  );
};

export default About;