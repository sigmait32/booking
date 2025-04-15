// import axios from "axios";
// const local = 'http://localhost:5000'
// const production = ''
// const api = axios.create({
//     baseURL: `${local}/api`,
//     withCredentials: true
// })

// export default api

import axios from "axios";

const local = 'http://localhost:5000';
const production = 'https://your-production-domain.com'; // Update this with your real prod URL

// Choose the base URL based on environment
const baseURL = import.meta.env.MODE === 'production' ? production : local;

const api = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
});

export default api;
