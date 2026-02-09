import { StrictMode } from 'react'; // Import the StrictMode component from react
import { BrowserRouter } from 'react-router-dom'; // Import the BrowserRouter component from reac-router-dom
import { createRoot } from 'react-dom/client';
import './index.scss'; // The style sheet of this component
import App from './App.jsx'; // Import the App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
