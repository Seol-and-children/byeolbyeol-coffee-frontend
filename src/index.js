import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot를 임포트
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './User/reducers/reducer';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

// 'root' DOM 요소를 찾아서 createRoot로 새로운 루트 생성
const root = createRoot(document.getElementById('root'));

// createRoot를 사용하여 App 컴포넌트 렌더링
root.render(
  <React.StrictMode>
    <Provider 
      store={createStoreWithMiddleware(Reducer, 
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
      <App />
    </Provider>
  </React.StrictMode>
);
