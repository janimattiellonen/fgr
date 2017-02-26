import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapped from '../IndexPage';
import { provideHooks } from 'redial';
import { getPersons, deletePerson } from '../../ducks/person';
import { getCourses } from '../../ducks/course';

import { compose } from 'recompose';

export default compose(
  connect(
    state => ({
      persons: state.person.get('persons'),
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
