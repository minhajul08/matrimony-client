import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

const SuccessStory = () => {
  const [success, setSuccess] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // Default to descending order

  useEffect(() => {
    fetch('http://localhost:5000/successStory')
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          if (sortOrder === 'asc') {
            return new Date(a.date) - new Date(b.date); // Ascending order
          } else {
            return new Date(b.date) - new Date(a.date); // Descending order
          }
        });
        setSuccess(sortedData);
      });
  }, [sortOrder]); // Re-fetch data when the sort order changes

  // Function to display stars based on the review score
  const renderStars = (review) => {
    const stars = [];
    const fullStars = Math.floor(review); // Number of full stars
    const halfStar = review % 1 >= 0.5; // Check if there's a half-star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-500" />
      );
    }

    // Add half star if applicable
    if (halfStar) {
      stars.push(
        <FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-500" />
      );
    }

    // Add empty stars for the remainder
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon key={`empty-${i}`} icon={faStarEmpty} className="text-gray-400" />
      );
    }

    return stars;
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center my-5">Success-Story</h1>
      </div>

      {/* Dropdown to select sort order */}
      <div className="flex justify-center items-center my-5">
        <label className="mr-2 ">Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="asc">Ascending (Oldest to Newest)</option>
          <option value="desc">Descending (Newest to Oldest)</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-5 my-5">
        {success.map((su) => (
          <div key={su._id} className=" card-compact bg-base-100 shadow-xl">
            <img className="h-[400px] w-full" src={su.coupleImage} alt="Couple" />
            <div className="flex justify-around mt-5">
              <h2 className="card-title">Date: {su.date}</h2>
              <div className="flex items-center">
                <p>Review: {renderStars(su.review)}</p>
              </div>
            </div>
            <p className='p-6 text-gray-600 font-serif'>{su.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStory;
