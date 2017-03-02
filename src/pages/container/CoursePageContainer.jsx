import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapped from '../CoursePage';
import { provideHooks } from 'redial';
import { getCourse } from '../../ducks/course';

import { compose } from 'recompose';

export default compose(
  connect(
    state => ({
      course: state.course.get('course'),
    }),
    dispatch => bindActionCreators({
      getCourse,
    }, dispatch)
  ),
  provideHooks({
  })
)(Wrapped);
