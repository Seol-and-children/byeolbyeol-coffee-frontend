import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/resultStyles.css';

const SearchResult = () => {
    const { searchWord } = useParams();
    const [inputValue, setInputValue] = useState(searchWord);
    const [activeContent, setActiveContent] = useState('all'); // 'all'을 기본값으로 설정

    // searchWord가 변경될 때마다 inputValue 상태 업데이트
    useEffect(() => {
        setInputValue(searchWord);
    }, [searchWord]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDivClick = (content) => {
        setActiveContent(content);
      };

      const getActiveComponent = () => {
        switch (activeContent) {
            case 'All':
                return React.lazy(() => import('./check_search_result/All'));
            case 'CheckRecipe':
                return React.lazy(() => import('./check_search_result/CheckRecipe'));
            case 'CheckReview':
                return React.lazy(() => import('./check_search_result/CheckReview'));
            case 'CheckName':
                return React.lazy(() => import('./check_search_result/CheckName'));       
            default:
                return null;
        }
    };

    const ActiveComponent = getActiveComponent();

    return (
        // <div>너가 찾은것은 {searchWord} 야 맞지?</div>
        <div className='main'>
            <div className='inner-main'>
                <div className='main-text'><strong>검색결과</strong></div>
                <div className='search'>
                    <div className='inner-search'>
                            <input
                                type="text"
                                className="result-input"
                                value={inputValue}
                                onChange={handleChange}
                            />
                        
                        <Link to={`/search/${inputValue}`}>
                            <div className='search-image'>
                                <img src="/images/search.png" alt="search icon" className="search-icon"/>
                            </div>
                        </Link>
                        
                    </div>
                </div>
                <div className='middle-text'><strong>{searchWord}</strong>에 대한 검색결과는 총 **건 입니다</div>
                <div className='check-result'>
                    <div 
                    className={`check ${activeContent === 'All' ? 'clicked' : ''}`} 
                    onClick={() => handleDivClick('All')}>전체</div>

                    <div 
                    className={`check ${activeContent === 'CheckRecipe' ? 'clicked' : ''}`}
                    onClick={() => handleDivClick('CheckRecipe')}>레시피</div>

                    <div 
                    className={`check ${activeContent === 'CheckReview' ? 'clicked' : ''}`}
                    onClick={() => handleDivClick('CheckReview')}>카페리뷰</div>

                    <div 
                    className={`check ${activeContent === 'CheckName' ? 'clicked' : ''}`}
                    onClick={() => handleDivClick('CheckName')}>닉네임</div>

                </div>
                <div className='wrap-checkbox'>
                    <div className='check-box'>
                        <Suspense fallback={<div>Loading...</div>}>
                            {ActiveComponent && <ActiveComponent data={searchWord} />}
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchResult;