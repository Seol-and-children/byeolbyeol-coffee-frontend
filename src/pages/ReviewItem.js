// ReviewItem.js

import React from 'react';
import PostTitle from '../components/ReviewItem/PostTitle';
import EditButton from '../components/ReviewItem/EditButton'; // 수정 버튼 컴포넌트 추가
import DeleteButton from '../components/ReviewItem/DeleteButton'; // 삭제 버튼 컴포넌트 추가

const ReviewItem = ({ review, onDelete }) => {
  return (
    <div>
      <PostTitle />
      <EditButton />
      <DeleteButton onDelete={onDelete} />
    </div>
  );
};

export default ReviewItem;