// src/context/TodoContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext(); //lưu dữ liệu dùng chung

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() => {
    fetchTodos(); //tự động lấy dữ liệu khi mở app
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_URL}?userId=1&_limit=10`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
//   const fetchTodos = async () => { //test loading/error
//   setLoading(true);
//   setError(null);

//   // đang tải 5 giây
//   await new Promise(resolve => setTimeout(resolve, 5000));

//   // lỗi
//   setError('Mất mạng rồi !');
//   setLoading(false);
// };

  const addTodo = async (title) => { //thêm
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      userId: 1
    };

    setTodos([newTodo, ...todos]); //sửa

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
    } catch (err) {}
  };

  const updateTodo = async (id, updates) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
        headers: { 'Content-type': 'application/json' }
      });
    } catch (err) {}
  };

  const deleteTodo = async (id) => { //xóa
    setTodos(todos.filter(todo => todo.id !== id));

    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (err) {}
  };

  return (
    <TodoContext.Provider value={{
      todos, loading,error,
      addTodo, updateTodo, deleteTodo, refetch: fetchTodos //gửi và nhận dữ liệu từ todoContext
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);