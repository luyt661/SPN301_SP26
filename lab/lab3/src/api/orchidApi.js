import axiosClient from "./axiosClient";

const API_URL = "/orchids";

// GET all orchids
export const getAllOrchids = () => {
  return axiosClient.get(API_URL);
};

// GET orchid by id
export const getOrchidById = (id) => {
  return axiosClient.get(`${API_URL}/${id}`);
};

// CREATE
export const createOrchid = (data) => {
  return axiosClient.post(API_URL, data);
};

// UPDATE
export const updateOrchid = (id, data) => {
  return axiosClient.put(`${API_URL}/${id}`, data);
};

// DELETE
export const deleteOrchid = (id) => {
  return axiosClient.delete(`${API_URL}/${id}`);
};
