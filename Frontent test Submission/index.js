
// 1. Import React core modules
import React from 'react';
import ReactDOM from 'react-dom/client';

// 2. Import global CSS and App component
import './index.css';
import App from './App';

// 3. Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// 4. Render the App component inside React.StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
