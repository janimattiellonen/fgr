import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wrapped from '../CoursePage';
import { provideHooks } from 'redial';
import { getCourses } from '../../ducks/course';

import { compose } from 'recompose';

export default compose(
  connect(
    state => ({

    }),
    dispatch => bindActionCreators({

    }, dispatch)
  ),
  provideHooks({
  })
)(Wrapped);
