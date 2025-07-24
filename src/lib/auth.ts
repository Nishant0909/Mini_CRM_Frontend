import api from './api';
import { Login_User_API, Logout_User_API, Register_User_API } from './constants';

// Login user
export const loginUser = async (credentials: { username: string; password: string }) => {
  const response = await api.post(Login_User_API, credentials);
  return response.data;
};

// Register user
export const registerUser = async (userData: any) => {
  const response = await api.post(Register_User_API, userData);
  return response.data;
}; 

// Logout user
export const logoutUser = async () => {
  const response = await api.post(Logout_User_API);
  return response.data;
};