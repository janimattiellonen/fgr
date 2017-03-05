import React from 'react';
import { List, Map } from 'immutable';
import { pure } from 'recompose';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cx from 'classnames';

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
    });
  };

  const classes = {
    styles.block,
    styles.foo
  };

  const placeBlock = (blockWidth, position) => {
    return (
      <div className={cx(classes)} style={{width: `${blockWidth}px`, left: "100px", top: "25px"}}></div>
    )
  };

  const filteredCourses = filterCourses(courses);
  const sortedCourses = sortCourses(filteredCourses);


  const earliestCourse = sortedCourses.minBy( course => course.foundationYear);
  const latestCourse = sortedCourses.maxBy( course => course.foundationYear);

  let difference = 0;

  if (earliestCourse && latestCourse) {
    difference = latestCourse.foundationYear - earliestCourse.foundationYear;
  }

  const blockWidth = 100 / sortedCourses.count();

  return (
    <div className={styles.root}>
      <h1>Timeline</h1>

      <div className={styles.blockContainer}>

        {placeBlock(blockWidth, 10)}

        {
          sortedCourses.map ((course, key) => {
            return (
              <div key={key} className={styles.block} style={{width: `${blockWidth}%`}}></div>
            );
          })
        }
      </div>



    </div>
  );
};

TimeLine.propTypes = {
  courses: ImmutablePropTypes.list.isRequired,
};

export default pure(TimeLine);
