import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReportComponent = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Axios를 사용하여 데이터를 가져오는 부분(Get)
        axios.get('/reports') // 엔드포인트 수정
            .then(response => {
                setReports(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log(reports);

    return (
        <div>
            <h1>Report List</h1>
            <ul>
                {reports.map(report => (
                    <div key={report.reportId}>
                        <strong>ID:</strong> {report.reportId}<br />
                        <strong>Author Name:</strong> {report.authorName}<br />
                        <strong>Reported Name:</strong> {report.reportedName}<br />
                        <strong>Report Reason:</strong> {report.reportReason}<br />
                        <strong>Reported Content:</strong> {report.reportedContent}<br />
                        <strong>Report Time:</strong> {report.reportTime}<br />
                        <strong>Content Title:</strong> {report.contentTitle}<br />
                        <strong>Processing:</strong> {report.processing ? 'Yes' : 'No'}<br />
                        <hr />
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ReportComponent;