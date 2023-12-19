import React from "react";

const TimeLoadDetail = ({ date }) => {
  const registerTime = new Date(date);
  const time = registerTime.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return <span>{time}</span>;
};

export default TimeLoadDetail;
