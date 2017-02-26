import React from 'react';
import styles from './CourseList.pcss';
import { pure } from 'recompose';

const CourseList = props => {
  return (
    <div className={styles.root}>
      <h1>COURSE LIST</h1>
    </div>
  );
};

export default pure(CourseList);
