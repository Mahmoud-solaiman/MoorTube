import { Routes, Route } from "react-router-dom"; // Import the Routes, and Route components from react-router-dom
import { Home } from "./pages/home/Home"; // Import the Home component
import { PageNotFound } from "./pages/PageNotFound"; // Import the PageNotFound component
import './App.scss'; // Import the style sheet of this component
import { SavedVideos } from "./pages/saved-videos/SavedVideos";
import { useState } from "react";

// The JSX of the App component and the Routes
export default function App() {
  const [ savedVideos, setSavedVideos ] = useState(null);
  const api_key = "AIzaSyBCuuLWqdp3M6gbyjAFnhBuF0vaat-zDqw"; //My google console API Key
  return (
    <Routes>
      <Route path="/" element={
        <Home 
          setSavedVideos={setSavedVideos}
          api_key={api_key}
        />
      } />
      <Route path="savedVideos" element={
        <SavedVideos 
          savedVideos={savedVideos}
          api_key={api_key}
        />
      } />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  ); 
}