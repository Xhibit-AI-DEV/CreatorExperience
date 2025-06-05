export const API_BASE_URL = 'http://localhost:2000';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth',
    GET_PUBLIC_KEY: '/api/auth/public-key',
    GET_BALANCE: '/api/auth/balance',
    GET_LOOKBOOKS: '/api/auth/lookbookIDs',
    GET_WALLET: '/api/auth/user/wallet'
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};