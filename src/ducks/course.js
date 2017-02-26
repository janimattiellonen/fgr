import { List, Map } from 'immutable';
import courseService from '../services/course-service';

const COURSE_GET_COURSES = 'COURSE_GET_COURSES';
const COURSE_GET_COURSES_FAILED = 'COURSE_GET_COURSES_FAILED';
const COURSE_GET_COURSES_DONE = 'COURSE_GET_COURSES_DONE';

export function getCourses() {
  return dispatch => {
    console.log("ssss");
    dispatch({type: COURSE_GET_COURSES, payload: null});

    return courseService.all()
      .then(response => dispatch({
        type: COURSE_GET_COURSES_DONE,
        payload: response
      }))
      .catch(error => dispatch({type: COURSE_GET_COURSES_FAILED, payload: error }));
  };
}

const defaultState = Map({
  courses: List(),
  loading: false,
  error: false
});

export default function (state = defaultState, action = {}) {
  const { type, payload } = action;
  switch (type) {

    case COURSE_GET_COURSES:
      return state
        .set('loading', true)
        .set('failed', false);

    case COURSE_GET_COURSES_DONE:
    console.log("foo");
      return state
        .set('loading', false)
        .set('failed', false)
        .set('courses', new List(payload));

    case COURSE_GET_COURSES_FAILED:
      return state
        .set('loading', false)
        .set('failed', true);

    default:
      return state;
  }
}
