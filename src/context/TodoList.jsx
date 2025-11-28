// src/components/TodoList.jsx
import TodoItem from './TodoItem';
import { useTodo } from './TodoContext';

export default function TodoList() {
  const { todos, loading, error } = useTodo(); //lấy dữ liệu từ todoContext và truyền cho todo.map

  if (loading) return <p className="text-center py-10">Đang tải...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <ul className="space-y-3">
      {todos.map(todo => ( //Lấy task trong danh sách, biến thành từng dòng rồi truyền cho todoItem xử lý
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500 py-10">Chưa có công việc nào</p>
      )}
    </ul>
  );
}