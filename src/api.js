import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
// const API_BASE = 'http://localhost:3005/api';

export const fetchYears = () => axios.get(`${API_BASE}/years`);
export const fetchDataByYear = (year) => axios.post(`${API_BASE}/data`,{year});
