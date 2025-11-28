// src/context/TodoContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { todoApi } from '../api/todoApi';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.fetchTodos({
        userId: 1,
        _limit: 10,
        // _start: 0,        //lấy từ trang 0,1,2....
        // completed: false, //lấy todo chưa xong
      });
      setTodos(data);
    } catch (err) {
      setError('Không tải được danh sách công việc');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Thêm 
  const addTodo = async (title) => {
    if (!title.trim()) return;
    const newTodo = { id: Date.now(), title: title.trim(), completed: false, userId: 1 };
    setTodos([newTodo, ...todos]);
    await todoApi.addTodo(newTodo).catch(() => fetchTodos()); // nếu lỗi thì reload
  };

  // Sửa
  const updateTodo = async (id, updates) => {
    setTodos(todos.map(t => t.id === id ? { ...t, ...updates } : t));
    await todoApi.updateTodo(id, updates).catch(() => fetchTodos());
  };

  // Xóa
  const deleteTodo = async (id) => {
    setTodos(todos.filter(t => t.id !== id));
    await todoApi.deleteTodo(id).catch(() => fetchTodos());
  };

  return (
    <TodoContext.Provider value={{
      todos,
      loading,
      error,
      addTodo,
      updateTodo,
      deleteTodo,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);