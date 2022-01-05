import axios from 'axios';
/**
 * http请求
 */
const http = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
});
http.interceptors.request.use(
  config => {
		if (config.method.toUpperCase() === 'GET') {
			config.params = config.data;
		}
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default http;