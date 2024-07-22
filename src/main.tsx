import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './redux/reduxStore';
import Spinner from './components/Spinner/Spinner';

ReactDOM.render(
  <Provider store={reduxStore}>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
);
