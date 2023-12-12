import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/styles.css';

const FranchiseLogo = ({ franchiseInfo }) => {
  const [franchise, setFranchise] = useState([]);

  console.log("asdsad");
console.log({franchiseInfo});
console.log("asdsad");
  useEffect(() => {
  axios.get(`/option/franchises/${franchiseInfo}`)
    .then(response => {
      setFranchise(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, [franchiseInfo]); // franchiseId를 의존성 배열에 추가


    return (
      <div key={franchise.franchiseId}>
            <div class="main-image" style={{
            backgroundColor: franchise.franchiseBackColor,
            color: franchise.franchiseFontColor,
            width: 74,
            height: 26,
            borderRadius: 20,
            }}>
            {franchise.franchiseName}
          </div>
        </div>
    )
}
export default FranchiseLogo;