// src/api/todoApi.js
import api from './axiosInstance';
const buildQuery = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString() ? `?${searchParams.toString()}` : '';
};

export const todoApi = {
  fetchTodos: (params = {}) =>
    api.get(`/todos${buildQuery(params)}`).then(res => res.data),

  addTodo: (todo) =>
    api.post('/todos', todo).then(res => res.data),

  updateTodo: (id, updates) =>
    api.put(`/todos/${id}`, updates).then(res => res.data),

  deleteTodo: (id) =>
    api.delete(`/todos/${id}`),
};