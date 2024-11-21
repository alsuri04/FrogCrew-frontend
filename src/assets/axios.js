// src/axios.js or src/http.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5228'
});

export default instance;
