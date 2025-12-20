import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Styles
import './styles/normalize.css';
import './styles/index.css';

// Redux
import { Provider } from 'react-redux';
import { store } from '@state/store';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
