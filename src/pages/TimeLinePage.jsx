import React from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styles from './TimeLinePage.pcss';

import TimeLine from '../components/TimeLine';

const TimeLinePage = props => {
  const { courses } = props;

  return (
    <section className={styles.root}>
      <TimeLine courses={courses} />
    </section>
  );
};

TimeLinePage.propTypes = {
  courses: ImmutablePropTypes.list.isRequired,
};

export default TimeLinePage;
