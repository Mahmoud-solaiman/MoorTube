import { Routes, Route } from "react-router-dom"; // Import the Routes, and Route components from react-router-dom
import { Home } from "./pages/home/Home"; // Import the Home component
import { PageNotFound } from "./pages/PageNotFound"; // Import the PageNotFound component
import './App.scss'; // Import the style sheet of this component

// The JSX of the App component and the Routes
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  ); 
}