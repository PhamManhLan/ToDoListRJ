import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Layout from './context/Layout';
import Home from './pages/Home';
import Todos from './pages/Todos';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}