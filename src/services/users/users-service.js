import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API_URL = `${API_BASE}/users`;

const api = axios.create({
  withCredentials: true,
});

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API_URL);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await axios.get(`${USERS_API_URL}/userId/${id}`);
  return response.data;
};

export const findUsersByRole = async (role) => {
  const response = await axios.get(`${USERS_API_URL}/role/${role}`);
  return response.data;
};

export const findUserByUsername = async (username) => {
  const response = await axios.get(`${USERS_API_URL}/username/${username}`);
  return response.data;
};

export const createUser = (user) => {
  return axios.post(USERS_API_URL, user);
};

export const updateUser = (newUser) => {
  return api.put(`${USERS_API_URL}/${newUser._id}`, newUser);
};

export const deleteUser = (id) => {
  return axios.delete(`${USERS_API_URL}/${id}`);
};

export const login = (user) => {
  return api.post(`${USERS_API_URL}/login`, user, {withCredentials: true});
};

export const logout = () => {
  return api.post(`${USERS_API_URL}/logout`, {}, {withCredentials: true});
};

export const register = (user) => {
  return api.post(`${USERS_API_URL}/register`, user, {withCredentials: true});
};

export const profile = () => {
  return api.get(`${USERS_API_URL}/profile`, {withCredentials: true});
};
