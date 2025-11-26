// src/components/TodoForm.jsx
import { useState } from 'react';
import { useTodo } from './TodoContext';

export default function TodoForm() {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title.trim());
    setTitle(''); // reset form
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập việc cần làm..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
      >
        Thêm
      </button>
    </form>
  );
}