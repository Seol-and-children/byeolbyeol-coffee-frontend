import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/styles.css";
import styles from "./FranchiseLogo.module.css";

const franchiseCache = {};

const FranchiseLogo = ({ franchiseInfo }) => {
  const [franchise, setFranchise] = useState([]);

  useEffect(() => {
    if (franchiseCache[franchiseInfo]) {
      setFranchise(franchiseCache[franchiseInfo]);
    } else {
      axios
        .get(`/option/franchises/${franchiseInfo}`)
        .then((response) => {
          franchiseCache[franchiseInfo] = response.data;
          setFranchise(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [franchiseInfo]); // franchiseId를 의존성 배열에 추가

  return (
    <div key={franchise.franchiseId}>
      <div
        className={styles.mainImage}
        style={{
          backgroundColor: franchise.franchiseBackColor,
          color: franchise.franchiseFontColor,
        }}
      >
        {franchise.franchiseName}
      </div>
    </div>
  );
};
export default FranchiseLogo;
