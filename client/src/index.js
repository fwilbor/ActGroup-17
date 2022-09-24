import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MessagesContextProvider } from './context/MessageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <MessagesContextProvider>
    <App />
    </MessagesContextProvider>
  </React.StrictMode>
);

