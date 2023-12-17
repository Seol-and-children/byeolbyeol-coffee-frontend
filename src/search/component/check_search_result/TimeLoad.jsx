import React from 'react';

const TimeLoad = ({ date }) => {
  const registerTime = new Date(date);
  const time = registerTime.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <span>{time}</span>;
};

export default TimeLoad;