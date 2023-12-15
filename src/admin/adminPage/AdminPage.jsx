import React, { useState, useEffect, Suspense } from 'react';
import ReportPageComponent from '../report/page/ReportPageComponent';
import '../adminCss/styles.css';

const AdminPage = () => {

  const [activeContent, setActiveContent] = useState('Report');

  useEffect(() => {
    handleDivClick('Report')
}, []);

const handleDivClick = (content) => {
  setActiveContent(content);
};

const getActiveComponent = () => {
  switch (activeContent) {
      case 'Report':
          return React.lazy(() => import('../report/page/ReportPageComponent'));
      case 'Ingredient':
          return React.lazy(() => import('../customOption/page/IngredientsPageComponent'));
      case 'Franchise':
          return React.lazy(() => import('../franchise/page/FranchisePageComponent'));    
      default:
          return React.lazy(() => import('../report/page/ReportPageComponent'));
  }
};

const ActiveComponent = getActiveComponent();

    return (
      <div className="main">
        <div className='inner-main'>
          <div className="username">관리자</div><hr/><br/>

            <div className='check-admin'>
                    <div 
                    className={`admin-check ${activeContent === 'Report' ? 'admin-clicked' : ''}`} 
                    onClick={() => handleDivClick('Report')}>신고접수내역</div>

                    <div 
                    className={`admin-check ${activeContent === 'Franchise' ? 'admin-clicked' : ''}`}
                    onClick={() => handleDivClick('Franchise')}>프렌차이즈 관리</div>

                    <div 
                    className={`admin-check ${activeContent === 'Ingredient' ? 'admin-clicked' : ''}`}
                    onClick={() => handleDivClick('Ingredient')}>레시피 옵션 관리</div>

                </div>

          <div className="admin-body">
          <div className="report-history">
                        <Suspense fallback={<div>Loading...</div>}>
                            {ActiveComponent && <ActiveComponent/>}
                        </Suspense>
                        </div>
                        </div>


            {/* <div className="admin-body-1">
              <div className="franchise-management">
                <FranchisePage/>
                </div>
              <div className="recipe-management">
                <IngredientsPageComponent/>
                </div>
            </div> */}
          </div>
        </div>
    );
  }
  export default AdminPage;