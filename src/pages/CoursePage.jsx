import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './CoursePage.pcss';

const CoursePage = props => {
  const { courses } = props;
  return (
    <section className={styles.root}>
      <h1>Course page</h1>
    </section>
  );
};

CoursePage.propTypes = {
};

export default CoursePage;
