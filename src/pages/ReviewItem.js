import React from 'react';

const ReviewItem = ({ review }) => (
  <div>
    <h3>{review.title}</h3>
    <p>{review.content}</p>
  </div>
);

export default ReviewItem;
