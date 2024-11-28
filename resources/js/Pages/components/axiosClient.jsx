// import axios from 'axios';

// const axiosClient = axios.create({
//   baseURL: 'http://127.0.0.1:8000', // Laravel backend URL
//   withCredentials: true, // Include cookies with requests
// });

// // Initialize CSRF token
// export const initializeCsrf = async () => {
//   await axiosClient.get('/sanctum/csrf-cookie');
// };

// export default axiosClient;


import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000', // Laravel backend URL
});

// Fetch and set CSRF token
export const initializeCsrf = async () => {
  const response = await axiosClient.get('/csrf-token');
  axiosClient.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
};

export default axiosClient;
