import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importa tu componente principal App
import './index.css'; // Importa estilos globales si los hay

// Busca el div con id="root" en index.html y renderiza tu App dentro de él
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Aquí se renderiza tu componente App */}
  </React.StrictMode>,
);
