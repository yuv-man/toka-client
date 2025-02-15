import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

export const projectAPI = {
  getAll: () => axios.get(`${API_BASE}/projects`),
  getById: (id) => axios.get(`${API_BASE}/projects/${id}`),
  search: (criteria) => axios.post(`${API_BASE}/projects/search`, criteria),
  create: (project) => axios.post(`${API_BASE}/projects`, project),
  update: (project) => axios.put(`${API_BASE}/projects/${project._id}`, project),
  delete: (id) => axios.delete(`${API_BASE}/projects/${id}`)
};

export const taskAPI = {
  getAll: () => axios.get(`${API_BASE}/tasks`),
  getById: (id) => axios.get(`${API_BASE}/tasks/${id}`),
  search: (criteria) => axios.post(`${API_BASE}/tasks/search`, criteria),
  create: (task) => axios.post(`${API_BASE}/tasks`, task),
  update: (task) => axios.put(`${API_BASE}/tasks/${task._id}`, task),
  delete: (id) => axios.delete(`${API_BASE}/tasks/${id}`)
}; 