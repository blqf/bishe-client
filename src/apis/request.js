import axios from 'axios';

axios.interceptors.response.use(resp => {
  return resp.data;
})

export default axios;