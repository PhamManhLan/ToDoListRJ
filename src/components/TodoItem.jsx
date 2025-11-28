// src/components/TodoItem.jsx 
import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodo(); //usecontext để không phải truyền dữ liệu qua các cấp giữa // lấy dữ liệu từ todocontext
  const [isEditing, setIsEditing] = useState(false); //để biết trạng thái của task là đang xem hay sửa
  const [editTitle, setEditTitle] = useState(todo.title); //lưu tạm nội dung đang gõ nhấn 'lưu' mới chính thức cập nhật

  const toggleComplete = () => {
    updateTodo(todo.id, { completed: !todo.completed }); //check box để hoàn thành task
  };

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== todo.title) {
      updateTodo(todo.id, { title: trimmed });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title); // khôi phục lại nội dung cũ nếu bấm Hủy
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
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleSave}
              onMouseDown={(e) => e.preventDefault()}
              className="text-green-600 hover:text-green-800 font-bold text-sm"
            >
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Hủy
            </button>
          </div>
        ) : (
          <>
            <span
              className={`flex-1 break-words select-none ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
            >
              {todo.title}
            </span>

            <div className="flex gap-3 ml-4">
              <button
                onClick={startEditing}
                className="text-blue-600 hover:text-blue-800 font-bold text-sm"
              >
                Sửa
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:text-red-800 font-bold text-sm"
              >
                Xóa
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}