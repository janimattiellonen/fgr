import React from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CourseList from '../components/CourseList';
import styles from './IndexPage.pcss';

const IndexPage = props => {
  const { courses } = props;
  return (
    <section className={styles.root}>
      <CourseList courses={courses} {...props}/>
    </section>
  );
};

IndexPage.propTypes = {
  courses: ImmutablePropTypes.list.isRequired,
};

export default IndexPage;
