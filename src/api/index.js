import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));

instance.interceptors.response.use((res) => {
  if (res.data.status === 'fail') {
    return Promise.reject(res.data.msg);
  }
  return res.data.data;
}, (error) => Promise.reject(error));
export default {
  login(params) {
    return instance.post('/passport/login', params);
  },
  register(params) {
    return instance.post('/passport/logon', params);
  },
  getCode(params) {
    return instance.post('/passport/getCode', params);
  },
};
