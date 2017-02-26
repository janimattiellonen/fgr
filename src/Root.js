import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import App from './pages/App';
import IndexPage from './pages/container/IndexPageContainer';
import CourseList from './components/CourseList';

import { setStatus, setFontStatus } from './ducks/webfont';

const Root = props => {
  const { store, history, webfonts } = props;

  const callback = status => {
    store.dispatch(setStatus(status));
  };

  return (
    <WebfontLoader config={webfonts} onStatus={callback}>
      <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={App}>
              <IndexRoute component={IndexPage} />

              <Route path="/courses" component={CourseList} />
            </Route>
          </Router>
      </Provider>
    </WebfontLoader>
  );
};

export default Root;
