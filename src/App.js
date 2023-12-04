// ... (이전 코드 생략)

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ReviewList from './pages/ReviewList';
import ReviewWrite from './pages/ReviewWrite';
import ReviewItem from './pages/ReviewItem';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
        </ul>
      </nav>

      <hr />

      <Route path="/" exact component={Home} />
      <Route path="/review-list" component={ReviewList} />
      <Route path="/review-write" component={ReviewWrite} />
      <Route path="/review-Item" component={ReviewItem} />
    </div>
  </Router>
);

export default App;
