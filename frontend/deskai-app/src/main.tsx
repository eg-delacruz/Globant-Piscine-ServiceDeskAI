import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/normalize.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '@state/store';

// Routes
import Home from './routes/home/App.tsx';
import Dashboard from '@routes/dashboard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
