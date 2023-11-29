// ... (이전 코드 생략)

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ReviewList from './pages/ReviewList';
import ReviewWrite from './pages/ReviewWrite';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/review-list">Review List</Link></li>
          <li><Link to="/review-write">Write a Review</Link></li>
        </ul>
      </nav>

      <hr />

      <Route path="/" exact component={Home} />
      <Route path="/review-list" component={ReviewList} />
      <Route path="/review-write" component={ReviewWrite} />
    </div>
  </Router>
);

export default App;
