import axios from './axios';

export default {
  all: () => axios.get('/api/courses').then(r => r.data),
}
