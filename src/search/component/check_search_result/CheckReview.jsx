import React from 'react';

const CheckReview = ({ data }) => {
  return (
    <div>
      <div>{data}리뷰 **건
      </div><hr></hr>
      <div className='sample-wrap'>
        <div className='sample-image'></div>
        <div className='sample-box'>
          <div className='sample-title'>달컴온 카페 다녀왔어요~;
          </div>
          <div className='sample-content-box'>
            <div className='sample-content'>
              이거는 내용이여~~
            </div>
            <div className='sample-info'>
              <div>날짜</div>
              <div>닉네임</div>
              <div>좋아요 수</div>
              <div>본 횟수</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckReview;