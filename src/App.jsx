import { Routes, Route } from "react-router-dom"; // Import the Routes, and Route components from react-router-dom
import { Home } from "./pages/home/Home"; // Import the Home component
import { PageNotFound } from "./pages/PageNotFound"; // Import the PageNotFound component
import { SavedVideos } from "./pages/saved-videos/SavedVideos";
import { Watch } from "./pages/watch/Watch";
import { useEffect, useRef, useState } from "react";

// The JSX of the App component and the Routes
export default function App() {
  const [savedVideos, setSavedVideos] = useState(JSON.parse(localStorage.getItem('disc')) || null);
  const api_key = import.meta.env.VITE_API_KEY; //My google console API Key
  const [translate, setTranslate] = useState(false); //The translateY value of the SidePanel
  const menuContainer = useRef(null); //The reference of the menu container
  const [discs, setDiscs] = useState(JSON.parse(localStorage.getItem('current-discs')) || []); //The latest disc list from localStorage
  const [errorMessage, setErrorMessage] = useState(null); //The error message state
  const [isErrorMessage, setIsErrorMessage] = useState(false); //State to render and disrender the error message
  const [showErrorMessage, setShowErrorMessage] = useState(null); //State to handle the setTimeout for disrendering the error message
  const sysPreferences = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('mode-preference') ? JSON.parse(localStorage.getItem('mode-preference')) : sysPreferences);
  const [ videoPlayerSrc, setVideoPlayerSrc ] = useState(null);

  //Function that handles the rendering and disrendering and the content of the error message
  function handleErrorMessage(message) {
    clearTimeout(showErrorMessage);
    setErrorMessage(message);
    setShowErrorMessage(setTimeout(() => setIsErrorMessage(false), 1400));
    setIsErrorMessage(true);
  }

  useEffect(() => {
    isDarkMode ? 
      document.documentElement.classList.add('darkmode') :
      document.documentElement.classList.remove('darkmode');
  }, [isDarkMode])

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDarkMode(true);
    if(!window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDarkMode(false);
  });
  
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
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
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
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          errorMessage={errorMessage}
          isErrorMessage={isErrorMessage}
          setVideoPlayerSrc={setVideoPlayerSrc}
        />
      } />
      <Route path="/watch" element={
        <Watch 
          savedVideos={savedVideos}
          setTranslate={setTranslate}
          menuContainer={menuContainer}
          isDarkMode={isDarkMode}
          translate={translate}
          discs={discs}
          setDiscs={setDiscs}
          handleErrorMessage={handleErrorMessage}
          setSavedVideos={setSavedVideos}
          setIsDarkMode={setIsDarkMode}
          isErrorMessage={isErrorMessage}
          errorMessage={errorMessage}
          videoPlayerSrc={videoPlayerSrc}
        />
      } />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}