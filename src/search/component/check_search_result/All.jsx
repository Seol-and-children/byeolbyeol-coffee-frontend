import React from 'react';
import CheckName from './CheckName';
import CheckRecipe from './CheckRecipe';
import CheckReview from './CheckReview';

const All = ({ data }) => {
    return (
        <div>
            <div>
                {/* 레시피 섹션 */}
                <CheckRecipe data={data}/><br/><br/><br/>         
                {/* 리뷰 섹션 */}
                <CheckReview data={data}/><br/><br/><br/> 
                {/* 닉네임 섹션 */}
                <CheckName data={data} />
            </div>
        </div>
    );
  };
  
  export default All;