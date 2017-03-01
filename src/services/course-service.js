import axios from './axios';

export default {
  getCourse: (courseId) => axios.get(`/api/courses/${courseId}`)
    .then(r => r.data),
  all: () => axios.get('/api/courses').then(r => r.data),
}
