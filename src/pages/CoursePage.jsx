import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './CoursePage.pcss';

class CoursePage extends React.Component {
  componentWillMount() {
    const { getCourse } = this.props;

    getCourse(this.props.params.courseId);
  }
  render() {
    const { course } = this.props;

    const classes = cx(styles.root,
      styles.coursePage
    );

    return (
      <section className={classes}>
        {
          course &&
          <div>
              <h1>{course.name}</h1>
              <p><Link to="/">Back to course list</Link></p>
              {
                course.mapUrl &&
                <img src={course.mapUrl} />
              }

          </div>
        }
      </section>
    );
  }
};

CoursePage.propTypes = {
};

export default CoursePage;
