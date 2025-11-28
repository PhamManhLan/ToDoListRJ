// src/pages/Todos.jsx
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Todos() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Danh sách công việc</h2>
      <TodoForm />
      <TodoList />
    </div>
  );
}