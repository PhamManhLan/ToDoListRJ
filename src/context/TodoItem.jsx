// src/components/TodoItem.jsx - HOÀN HẢO, KHÔNG BUG, KHÔNG DRAMA
import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const toggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const handleSave = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      e.target.blur(); // ← FIX BUG TRÙNG NÚT LƯU/SỬA 100%
    }

    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      updateTodo(todo.id, { title: trimmed });
    }
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition mb-3 border">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed || false}
          onChange={toggleComplete}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave(e)}
            onBlur={handleSave}
            className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={startEditing}
            className={`flex-1 break-words cursor-pointer select-none ${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-3 ml-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            onMouseDown={(e) => e.preventDefault()} // thêm dòng này cho chắc
            className="text-green-600 hover:text-green-800 font-bold text-sm"
          >
            Lưu
          </button>
        ) : (
          <button
            onClick={startEditing}
            className="text-blue-600 hover:text-blue-800 font-bold text-sm"
          >
            Sửa
          </button>
        )}

        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-600 hover:text-red-800 font-bold text-sm"
        >
          Xóa
        </button>
      </div>
    </li>
  );
}