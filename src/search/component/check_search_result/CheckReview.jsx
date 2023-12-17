import React from 'react';

const CheckReview = ({ data }) => {
  
  return (
    <div>
      <div>리뷰 **건
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
            <div className="sample-info">
                  <div className="search-left">
                    <div className="search-time">&nbsp;&nbsp;&nbsp;|&nbsp;</div>
                    <div className="search-name">
                      
                    </div>
                  </div>
                  <div className="search-right">
                    <div className="search-like-count">
                    <img className="small-image" src={'/images/good.png'}/>&nbsp;&nbsp;
                    </div>
                    <div className="search-view-count">
                    <img className="small-image" src={'/images/see.png'}/></div>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckReview;