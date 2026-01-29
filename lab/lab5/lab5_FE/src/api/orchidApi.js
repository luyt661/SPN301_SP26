import axios from "axios";

const BASE_URL = "http://localhost:8080";

// API cho Orchid
export const getAllOrchids = () => axios.get(`${BASE_URL}/orchids`);
export const getOrchidById = (id) => axios.get(`${BASE_URL}/orchids/${id}`);
export const createOrchid = (data) => axios.post(`${BASE_URL}/orchids`, data);
export const updateOrchid = (id, data) => axios.put(`${BASE_URL}/orchids/${id}`, data);
export const deleteOrchid = (id) => axios.delete(`${BASE_URL}/orchids/${id}`);

// API cho Category
export const getAllCategories = () => axios.get(`${BASE_URL}/categories`);