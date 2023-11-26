import React from 'react';
import ReportEntityComponent from './ReportEntityComponent';
import ReportComponent from '../../../componunt/ReportList';
import ReportAdd from '../../../componunt/ReportAdd';

{/*최종 신고페이지 컴포넌트*/}
const ReportPageComponent = () => {
  return (
    <div>
      <h1>신고 페이지</h1>
      {/*얘는 아님*/}
      <ReportEntityComponent/>
      {/* 추가할 경우에도 ReportEntityComponent를 추가하면 됨 */}
      <ReportComponent/>
      <ReportAdd/>
    </div>
  );{/**/}
};

export default ReportPageComponent;