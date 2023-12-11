import React from "react";
import { Link } from "react-router-dom";

const HomePage =() => {
    return (
      <div>
        <Link to={"/admin"}>관리자 페이지 이동</Link>
      </div>
    );
  };
  export default HomePage;