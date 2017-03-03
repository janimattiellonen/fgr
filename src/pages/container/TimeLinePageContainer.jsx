import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapped from '../TimeLinePage';
import { provideHooks } from 'redial';
import { getCourses } from '../../ducks/course';

import { compose } from 'recompose';

export default compose(
  connect(
    state => ({
      courses: state.course.get('courses'),
      loading: state.course.get('loading'),
      error: state.course.get('error'),
    }),
    dispatch => bindActionCreators({
    }, dispatch)
  ),
  provideHooks({
    fetch: ({ dispatch }) => dispatch(getCourses()),
  })
)(Wrapped);
