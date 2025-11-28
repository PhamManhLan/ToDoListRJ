// src/api/todoApi.js
const API_BASE = 'https://jsonplaceholder.typicode.com/todos';

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
  // Lấy danh sách
  fetchTodos: async (params = {}) => {
    const res = await fetch(`${API_BASE}${buildQuery(params)}`);
    return res.json()
  },

  // Thêm
  addTodo: async (todo) => {
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
  },

  // Sửa
  updateTodo: async (id, updates) => {
    await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  },

  // XÓA
  deleteTodo: async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  },
};