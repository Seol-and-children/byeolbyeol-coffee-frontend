// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ReviewList from './pages/ReviewList';
import ReviewWrite from './pages/ReviewWrite';
import ReviewItem from './pages/ReviewItem';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/reviews" />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/review-write" element={<ReviewWrite />} />
        <Route path="/reviews/:reviewId" element={<ReviewItem />} />

      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
