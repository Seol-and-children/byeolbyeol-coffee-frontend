// AuthorNickname.js

import React from 'react';

const AuthorNickname = ({ nickname }) => {
  return (
    <span className="author-nickname">
      작성자: {nickname}
    </span>
  );
};

export default AuthorNickname;
