// src/components/TodoItem.jsx
import { useTodo } from '../context/TodoContext';

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useTodo();

  const toggleComplete = () => {
    updateTodo(todo.id, { 
      completed: !(todo.completed === true)  // nếu undefined thì coi như false
    });
  };

  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed === true}  // fix bug checkbox mới thêm
          onChange={toggleComplete}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
        />
        <span 
          className={`flex-1 break-words ${todo.completed === true ? 'line-through text-gray-500' : 'text-gray-800'}`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 font-bold ml-4"
      >
        Xóa
      </button>
    </li>
  );
}