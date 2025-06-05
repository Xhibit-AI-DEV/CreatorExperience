export const API_BASE_URL = 'YOUR_BASE_URL'; // Replace with your actual base URL

export const API_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login'
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};