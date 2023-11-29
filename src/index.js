// app.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReviewWrite from './pages/ReviewWrite';
import ReviewList from './pages/ReviewList';

ReactDOM.render(
  <Router>
  <React.StrictMode>
    <ReviewList />
    <ReviewWrite />

  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);
