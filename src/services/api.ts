import axios from 'axios';

const API_BASE = 'https://your-backend-url.com/api';

export const getPlans = async () => {
  const res = await axios.get(`${API_BASE}/plans`);
  return res.data;
};

export const confirmPayment = async (userId: number, plan: string) => {
  const res = await axios.post(`${API_BASE}/confirm-payment`, { userId, plan });
  return res.data;
};

export const getAccountStatus = async (userId: number) => {
  const res = await axios.get(`${API_BASE}/account/${userId}`);
  return res.data;
};

export const requestPayout = async (userId: number, method: string, details: string) => {
  const res = await axios.post(`${API_BASE}/payout`, { userId, method, details });
  return res.data;
};

export const sendSupportMessage = async (userId: number, message: string) => {
  const res = await axios.post(`${API_BASE}/support`, { userId, message });
  return res.data;
};