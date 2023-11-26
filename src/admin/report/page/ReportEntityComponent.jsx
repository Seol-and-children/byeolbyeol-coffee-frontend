import React from 'react';
import CheckboxComponent from '../component/CheckBoxComponent';
import ReportReasonComponent from '../component/ReportReasonComponent';
import AuthorNameComponent from '../component/AuthorNameComponent';
import ReportedNameComponent from '../component/ReportedNameComponent';
import DivisionComponent from '../component/DivisionComponent';
import SeeMoreComponent from '../component/SeeMoreComponent';
import TitleComponent from '../component/TitleComponent';

const ReportEntityComponent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <CheckboxComponent/>
      <ReportReasonComponent/>
      <AuthorNameComponent/>
      <ReportedNameComponent/>
      <DivisionComponent/>
      <TitleComponent/>
      <SeeMoreComponent/>
    </div>
  );
};

export default ReportEntityComponent;