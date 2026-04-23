import { StrictMode } from 'react'; // Import the StrictMode component from react
import { BrowserRouter } from 'react-router-dom'; // Import the BrowserRouter component from reac-router-dom
import { createRoot } from 'react-dom/client';
import './index.scss'; // The style sheet of this component
import App from './App'; // Import the App component

const root = document.getElementById('root');

if (!root) {
  throw new Error('The root element seems to not exist.');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
