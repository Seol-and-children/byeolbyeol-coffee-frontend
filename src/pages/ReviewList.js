// ReviewList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PostTitle from '../components/ReviewList/PostTitle';


const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 서버에서 리뷰 목록을 가져옵니다.
    axios.get('http://localhost:8080/api/reviews')
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  return (
    <div>
      <PostTitle />
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
