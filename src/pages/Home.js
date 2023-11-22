// Home.js
import React, { useState } from 'react';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

const Home = () => {
  const [reviews, setReviews] = useState([]);

  const addReview = (newReview) => {
    setReviews([...reviews, { ...newReview, id: Date.now() }]);
  };

  return (
    <div>
      <ReviewForm onSubmit={addReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Home;
