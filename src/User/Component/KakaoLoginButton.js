import React from 'react';

const KakaoLoginButton = ({ href, children }) => {
  return (
    <a href={href} className="kakao-login-button">
      {children}
    </a>
  );
};

export default KakaoLoginButton;