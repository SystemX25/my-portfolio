import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import './i18n/config.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);