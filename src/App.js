// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewList from './pages/ReviewList';
import ReviewWrite from './pages/ReviewWrite';
import ReviewItem from './pages/ReviewItem';

const App = () => (
  <Router>
    <Routes>
      <Route path="/reviews" element={<ReviewList />} />
      <Route path="/review-write" element={<ReviewWrite />} />
      <Route path="/reviews/:reviewId" element={<ReviewItem />} />
    </Routes>
  </Router>
);

export default App;
