// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold mb-6">Chào mừng đến Todo App CRUD</h2>
      <Link 
        to="/todos" 
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700"
      >
        Vào danh sách Todo ngay →
      </Link>
    </div>
  );
}