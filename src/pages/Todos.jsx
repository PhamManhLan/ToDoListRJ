// src/pages/Todos.jsx
import TodoForm from '../context/TodoForm';
import TodoList from '../context/TodoList';
import { useTodo } from '../context/TodoContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const { loading } = useTodo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) return;
  }, [loading]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Danh sách công việc</h2>
      <TodoForm />
      <TodoList />
    </div>
  );
}