import React from 'react';
import { List, Map } from 'immutable';
import { pure } from 'recompose';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './TimeLine.pcss';

const TimeLine = props => {
  const { courses } = props;

  const filterCourses = (courses) => {
    return courses.filter(course => course.foundationYear !== null);
  };

  const sortCourses = (courses) => {
    return courses.sort((a, b) => {
      if (a.foundationYear < b.foundationYear) {
        return -1;
      } else if (a.foundationYear > b.foundationYear) {
        return 1
      } else {
        return 0;
      }
    }).toJS();
  };

  const filteredCourses = filterCourses(courses);
  const sortedCourses = sortCourses(filteredCourses);


  const foo = new List(sortedCourses);

  console.log(foo.get(0));


  return (
    <div className={styles.root}>
      <h1>Timeline</h1>

      {
        sortedCourses.map ((course, key) => {
          return (
            <p key={key}><Link to={`/course/${course.id}`}>{course.name} ({course.foundationYear})</Link></p>
          );
        })
      }
    </div>
  );
};

TimeLine.propTypes = {
  courses: ImmutablePropTypes.list.isRequired,
};

export default pure(TimeLine);
