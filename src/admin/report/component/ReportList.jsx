import React, { useEffect, useState } from "react";
import Pagination from "../../../components/common/Pagination";
import axios from "axios";
import "../css/styles.css";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("report");
  const [recipesPerPage] = useState(15);

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    axios
      .all([axios.get("/reports/recipes"), axios.get("/reports/reviews")])
      .then(
        axios.spread((recipesResponse, reviewsResponse) => {
          // recipes 데이터와 reviews 데이터를 합치기
          const allReports = [...recipesResponse.data, ...reviewsResponse.data];

          // 모든 데이터를 reportTime을 기준으로 내림차순으로 정렬
          const sortedReports = allReports.sort(
            (a, b) => new Date(b.reportTime) - new Date(a.reportTime)
          );

          // 결과를 상태에 설정
          setReports(sortedReports);

          // 초기에는 모두 더보기 상태를 false로 초기화
          setShowMore(new Array(sortedReports.length).fill(false));
        })
      )
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleMore = (index) => {
    // 해당 인덱스의 더보기 상태만을 true로 설정하고, 나머지는 모두 false로 설정
    setShowMore((prev) =>
      prev.map((_, i) => (i === index ? !prev[index] : false))
    );
  };

  const handleSearch = (Id, category) => {
    if (category == "레시피 게시판") {
      // 페이지 이동과 함께 새로고침
      window.location.href = `/recipes/${Id}`;
    } else if (category == "리뷰 게시판") {
      window.location.href = `/reviews/${Id}`;
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = reports.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginaten = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="report-history">
      
      <div id="main-report-bar">
        <div className="exam-item report-category">구분</div>
        <div className="exam-item report-title">제목</div>
        <div className="exam-item report-author">작성자</div>
        <div className="exam-item reported">신고자</div>
        <div className="exam-item report-content">신고내용</div>
        <div className="exam-item status"></div>
      </div>
      <div id="inner-report-bar">
        {currentRecipes.map((report, index) => (
          <div key={report.reportId}>
            <div id="report-bar">
              <div className="exam-item report-category">
                {report.reportCategory}
              </div>
              {report.reportCategory === "레시피 게시판" && (
                <div>
                  <div
                    className="exam-item report-title"
                    onClick={() =>
                      handleSearch(report.recipeId, report.reportCategory)
                    }
                  >
                    {report.contentTitle}
                  </div>
                </div>
              )}
              {report.reportCategory === "리뷰 게시판" && (
                <div>
                  <div
                    className="exam-item report-title"
                    onClick={() =>
                      handleSearch(report.reviewId, report.reportCategory)
                    }
                  >
                    {report.contentTitle}
                  </div>
                </div>
              )}
              <div className="exam-item report-author">{report.authorName}</div>
              <div className="exam-item reported">{report.reportedName}</div>
              <div className="exam-item report-content">
                {report.reportReason}
              </div>
              {/* <div class="exam-item status">{report.processing ? 'Yes' : 'No'}</div> */}
              <div className="exam-item status">
                <img
                  src="/images/moreSee.png"
                  alt="moreSee icon"
                  className="moreSee-icon"
                  onClick={() => toggleMore(index)}
                />
              </div>
            </div>
            {/* 더보기 창 */}
            {showMore[index] && (
              <div className="more-box">{report.reportReason}</div>
            )}
          </div>
        ))}
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={reports.length}
        paginate={paginaten}
      />
    </div>
  );
};

export default ReportList;
