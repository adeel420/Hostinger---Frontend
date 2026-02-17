import axios from "axios";

// const API_URL = "http://localhost:8080";
const API_URL = "https://hostinger-backend.onrender.com";

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/user/signup`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const verifyEmail = async (email, code) => {
  const response = await axios.post(`${API_URL}/user/verify-email`, {
    email,
    code,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login`, {
    email,
    password,
  });
  return response.data;
};

export const socialAuth = async (name, email, provider, providerId, avatar) => {
  const response = await axios.post(`${API_URL}/user/social-auth`, {
    name,
    email,
    provider,
    providerId,
    avatar,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/user/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const response = await axios.put(`${API_URL}/user/reset-password`, {
    email,
    otp,
    newPassword,
  });
  return response.data;
};
