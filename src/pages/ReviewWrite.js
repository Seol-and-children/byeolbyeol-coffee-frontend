import React from 'react';
import PostTitle from '../components/ReviewWrite/PostTitle';
import NewPostTitle from '../components/ReviewWrite/NewPostTitle';


const ReviewWrite = () => (
  <div>
    <PostTitle />
    <NewPostTitle title={newTitle} onTitleChange={handleNewTitleChange} />
    {/* 여기에 다른 컴포넌트들 추가 */}
  </div>
);

export default ReviewWrite;
