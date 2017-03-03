import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import IndexPage from './pages/container/IndexPageContainer';
import CoursePage from './pages/container/CoursePageContainer';
import TimeLinePage from './pages/container/TimeLinePageContainer';

export default [
  <Route key="index" path="/" component={App}>
    <IndexRoute component={IndexPage} />
    <Route path="course/:courseId" component={CoursePage} />
    <Route path="timeline" component={TimeLinePage} />

  </Route>
];
