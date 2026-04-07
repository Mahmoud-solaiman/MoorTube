import { Routes, Route } from "react-router-dom"; // Import the Routes, and Route components from react-router-dom
import { Home } from "./pages/home/Home"; // Import the Home component
import { PageNotFound } from "./pages/page_not_found/PageNotFound"; // Import the PageNotFound component
import { SavedVideos } from "./pages/saved-videos/SavedVideos";
import { Watch } from "./pages/watch/Watch";
import { useEffect, useRef, useState } from "react";

// The JSX of the App component and the Routes
export default function App() {
  const discStorage = localStorage.getItem('disc');
  const currentDiscsStorage = localStorage.getItem('current-discs');
  const modePreferenceStorage = localStorage.getItem('mode-preference');
  const [ savedVideos, setSavedVideos ] = useState(discStorage ? JSON.parse(discStorage) : []);
  const api_key = import.meta.env.VITE_API_KEY //My google console API Key
  const [ translate, setTranslate ] = useState(false); //The translateY value of the SidePanel
  const menuContainer = useRef(null); //The reference of the menu container
  const [ discs, setDiscs ] = useState(currentDiscsStorage ? JSON.parse(currentDiscsStorage) : []); //The latest disc list from localStorage
  const [ errorMessage, setErrorMessage ] = useState(''); //The error message state
  const [ isErrorMessage, setIsErrorMessage ] = useState(false); //State to render and disrender the error message
  const [ showErrorMessage, setShowErrorMessage ] = useState<number | undefined>(undefined); //State to handle the setTimeout for disrendering the error message
  const sysPreferences = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [ isDarkMode, setIsDarkMode ] = useState(modePreferenceStorage ? JSON.parse(modePreferenceStorage) : sysPreferences);
  const [ watchTitle, setWatchTitle ] = useState('Channel search');

  //Function that handles the rendering and disrendering and the content of the error message
  function handleErrorMessage(message: string): void {
    clearTimeout(showErrorMessage);
    setErrorMessage(message);
    setShowErrorMessage(setTimeout(() => setIsErrorMessage(false), 1400));
    setIsErrorMessage(true);
  }

  useEffect(() => {
    isDarkMode ? 
      document.documentElement.classList.add('darkmode') :
      document.documentElement.classList.remove('darkmode');
  }, [isDarkMode]);
  
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
          setWatchTitle={setWatchTitle}
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
          setWatchTitle={setWatchTitle}
        />
      } />
      <Route path="/watch" element={
        <Watch
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
          watchTitle={watchTitle}
          setWatchTitle={setWatchTitle}
        />
      } />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}