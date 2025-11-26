// src/context/TodoContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?userId=1&_limit=10`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      userId: 1
    };

    setTodos([newTodo, ...todos]);

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

  const deleteTodo = async (id) => {
    setTodos(todos.filter(todo => todo.id !== id));

    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (err) {}
  };

  return (
    <TodoContext.Provider value={{
      todos, loading,
      addTodo, updateTodo, deleteTodo, refetch: fetchTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);