import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './CourseList.pcss';
import { pure } from 'recompose';

const CourseList = props => {
  const { courses, loading, error } = props;

  return (
    <div className={styles.root}>
      <h1>Courses</h1>

      {
        loading &&
        <p>LOADING</p>
      }

      {
        error &&
        <p>Error loading courses</p>
      }

      {
        courses.map ((course, key) => {
          return (
            <p key={key}>{course.name}</p>
          );
        })
      }
    </div>
  );
};

CourseList.propTypes = {
  courses: ImmutablePropTypes.list.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default pure(CourseList);
