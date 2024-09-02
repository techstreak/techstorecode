// ecommercetracker-frontend/src/services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://94eb-49-43-225-154.ngrok-free.app', // Use your ngrok URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Ensure this header is included
  },
});

export default instance;
