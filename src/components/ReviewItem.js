// ReviewItem.js
import React, { useState } from 'react';
import ReviewHeader from './ReviewHeader';
import ReviewTitle from './ReviewTitle';
import ReviewAuthor from './ReviewAuthor';
import ReviewContent from './ReviewContent';
import Like from './Like';
import CommentSection from './CommentSection';
import BackToListButton from './BackToListButton';

const ReviewItem = ({ review, onEdit, onDelete, onBackToList }) => {
  return (
    <div>
      <ReviewHeader onEdit={onEdit} onDelete={onDelete} />
      <ReviewTitle title={review.title} />
      <ReviewAuthor author={review.author} />
      <ReviewContent content={review.content} />
      <Like likes={review.likes} />
      <CommentSection />
      <BackToListButton onBackToList={onBackToList} />
    </div>
  );
};

export default ReviewItem;