import { Routes, Route } from "react-router-dom"; // Import the Routes, and Route components from react-router-dom
import { Home } from "./pages/home/Home"; // Import the Home component
import { PageNotFound } from "./pages/PageNotFound"; // Import the PageNotFound component
import './App.scss'; // Import the style sheet of this component
import { SavedVideos } from "./pages/saved-videos/SavedVideos";
import { useRef,useState } from "react";

// The JSX of the App component and the Routes
export default function App() {
  const [ savedVideos, setSavedVideos ] = useState(JSON.parse(localStorage.getItem('disc')) || null);
  const api_key = import.meta.env.VITE_API_KEY; //My google console API Key
  const [ translate, setTranslate ] = useState(false); //The translateY value of the SidePanel
  const menuContainer = useRef(null); //The reference of the menu container
  const [ discs, setDiscs ] = useState(JSON.parse(localStorage.getItem('current-discs')) || []); //The latest disc list from localStorage
  const [ errorMessage, setErrorMessage ] = useState(null); //The error message state
  const [ isErrorMessage, setIsErrorMessage ] = useState(false); //State to render and disrender the error message
  const [ showErrorMessage, setShowErrorMessage ] = useState(null); //State to handle the setTimeout for disrendering the error message

  //Function that handles the rendering and disrendering and the content of the error message
  function handleErrorMessage(message) {
    clearTimeout(showErrorMessage);
    setErrorMessage(message);
    setShowErrorMessage(setTimeout(() => setIsErrorMessage(false), 1400));
    setIsErrorMessage(true);
  }
  
  return (
    <Routes>
      <Route path="/" element={
        <Home 
          setSavedVideos={setSavedVideos}
          api_key={api_key}
          setTranslate={setTranslate}
          translate={translate}
          menuContainer={menuContainer}
          discs={discs}
          setDiscs={setDiscs}
          handleErrorMessage={handleErrorMessage}
          isErrorMessage={isErrorMessage}
          errorMessage={errorMessage}
        />
      } />
      <Route path="savedVideos" element={
        <SavedVideos 
          savedVideos={savedVideos}
          api_key={api_key}
          setTranslate={setTranslate}
          translate={translate}
          discs={discs}
          setDiscs={setDiscs}
          handleErrorMessage={handleErrorMessage}
          setSavedVideos={setSavedVideos}
        />
      } />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  ); 
}