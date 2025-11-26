// src/components/Layout.jsx
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Todo App CRUD</h1>
          <nav>
            <Link to="/" className="mx-2 hover:underline">Home</Link>
            <Link to="/todos" className="mx-2 hover:underline">Todos</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}