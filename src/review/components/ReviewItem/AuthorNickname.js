// AuthorNickname.js

import React from 'react';

const AuthorNickname = ({ reviews }) => {
  const userNickname = reviews ? reviews.userNickname : '';

  return (
    <span className="author-nickname">
      작성자: {userNickname}
    </span>
  );
};

export default AuthorNickname;
