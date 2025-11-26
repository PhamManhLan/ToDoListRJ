// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-6xl font-bold text-red-600">404</h2>
      <p className="text-2xl mt-4">Không tìm thấy trang</p>
      <Link to="/" className="text-blue-600 underline mt-6 inline-block">
        ← Quay về trang chủ
      </Link>
    </div>
  );
}