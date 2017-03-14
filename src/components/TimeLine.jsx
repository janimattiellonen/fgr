import React from 'react';
import { List, Map, OrderedMap, Range } from 'immutable';
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

  const classes = cx(styles.block, {
    [styles.foo]: true
});

  const placeBlock = (blockWidth, position, order, key) => {
    return (
      <div key={key} className={classes} style={
        {
          background: 'blue',
          width: `${blockWidth}%`,
          right: `${(blockWidth * (position))}%`,
          top: `${(107 + (order - 1) * 25)}px`,
          background: '#0078a0'
        }
      }></div>
    )
  };

  const filteredCourses = filterCourses(courses);
  const sortedCourses = sortCourses(filteredCourses);
  let groupedCourses = new OrderedMap();

  sortedCourses.map (item => {
    if (!groupedCourses.has(item.foundationYear)) {
      groupedCourses = groupedCourses.set(item.foundationYear, List([item]));
    } else {
      groupedCourses = groupedCourses.set(
        item.foundationYear,
        groupedCourses.get(item.foundationYear).concat(item)
      );
    }
  });

  const earliestCourse = sortedCourses.minBy( course => course.foundationYear);
  const latestCourse = sortedCourses.maxBy( course => course.foundationYear);

  let difference = 0;
  let blockWidth = 0;

  if (earliestCourse && latestCourse) {
    difference = latestCourse.foundationYear - earliestCourse.foundationYear;
    blockWidth = 100 / (difference + 1);
  }

  return (
    <div className={styles.root}>
      <h1>Timeline</h1>

      <div className={styles.blockContainer}>
        {
          difference > 0 &&
          Range(0, difference + 1).map ((item, key) => {
            return (<div key={key} className={styles.block} style={{width: `${blockWidth}%`}}>{earliestCourse.foundationYear + key}</div>);
          })
        }

        {
          groupedCourses.map ((courses, year) => {
            return courses.map ((course, index) => {
              return (
                placeBlock(blockWidth, latestCourse.foundationYear - year, index, year + "_" + index)
              );
            })
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
