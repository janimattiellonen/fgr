import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import App from './pages/App';
import IndexPage from './pages/container/IndexPageContainer';
import CoursePage from './pages/container/CoursePageContainer';
import TimeLinePage from './pages/container/TimeLinePageContainer';

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

              <Route path="course/:courseId" component={CoursePage} />
              <Route path="timeline" component={TimeLinePage} />

            </Route>
          </Router>
      </Provider>
    </WebfontLoader>
  );
};

export default Root;
