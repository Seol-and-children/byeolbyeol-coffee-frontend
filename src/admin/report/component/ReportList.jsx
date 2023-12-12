import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/styles.css';

const ReportList = () => {
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
            <div id="report-header">신고접수내역</div>
            <div id="main-report-bar">
                <div class="exam-item report-check">Check</div>
                <div class="exam-item category">구분</div>
                <div class="exam-item title">제목</div>
                <div class="exam-item author">작성자</div>
                <div class="exam-item reported">신고자</div>
                <div class="exam-item report-content">신고내용</div>
                <div class="exam-item status">통</div>
            </div>
                {reports.map(report => (
                    <div key={report.reportId}>
                        <div id="report-bar">
                            <div class="exam-item report-check">Check</div><br />
                            <div class="exam-item category">구분</div>
                            <div class="exam-item title">{report.contentTitle}</div>
                            <div class="exam-item author">{report.authorName}</div>
                            <div class="exam-item reported">{report.reportedName}</div>
                            <div class="exam-item report-content">{report.reportReason}</div>
                            <div class="exam-item status">{report.processing ? 'Yes' : 'No'}</div>
                            </div>
                    </div>
                ))}
        </div>
    );
};

export default ReportList;