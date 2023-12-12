import React from 'react';
import ReportPageComponent from '../report/page/ReportPageComponent';
import IngredientsPageComponent from '../customOption/page/IngredientsPageComponent';
import FranchisePage from '../franchise/page/FranchisePageComponent';
import '../adminCss/styles.css';

const AdminPage = () => {
    return (
      <div className="main">
        <div className='inner-main'>
          <div className="username">관리자</div><hr/><br/>
          <div className="admin-body">
            <div className="report-history">
            < ReportPageComponent />
            </div>
            <div className="admin-body-1">
              <div className="franchise-management">
                <FranchisePage/>
                </div>
              <div className="recipe-management">
                <IngredientsPageComponent/>
                </div>
            </div>
            {/* <div className='sub'  >
            <form style={{ display: 'flex', flexDirection: 'column'}}></form>
              <FranchisePage/>
              <IngredientsPageComponent/>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
  export default AdminPage;