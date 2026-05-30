import { Routes, Route, useNavigate, Navigate } from "react-router-dom"; // Import the Routes, and Route components from react-router-dom
import { Home } from "./pages/home/Home"; // Import the Home component
import { PageNotFound } from "./pages/404/PageNotFound"; // Import the PageNotFound component
import { SavedVideos } from "./pages/saved-videos/SavedVideos";
import { Watch } from "./pages/watch/Watch";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { DiscType, SavedVideosDetails } from "./types/types";
import Authentication from "./pages/auth/Authentication";

// The JSX of the App component and the Routes
export default function App() {
  const modePreferenceStorage = localStorage.getItem('mode-preference');
  const api_key = import.meta.env.VITE_YOUTUBE_API_KEY //My google console API Key
  const [ translate, setTranslate ] = useState(false); //The translateY value of the SidePanel
  const menuContainer = useRef(null); //The reference of the menu container
  const [ discs, setDiscs ] = useState<DiscType[]>([]); //The latest disc list from localStorage
  const [ errorMessage, setErrorMessage ] = useState(''); //The error message state
  const [ isErrorMessage, setIsErrorMessage ] = useState(false); //State to render and disrender the error message
  const [ showErrorMessage, setShowErrorMessage ] = useState<number | undefined>(undefined); //State to handle the setTimeout for disrendering the error message
  const sysPreferences = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [ isDarkMode, setIsDarkMode ] = useState(modePreferenceStorage ? JSON.parse(modePreferenceStorage) : sysPreferences);
  const [ watchTitle, setWatchTitle ] = useState('Channel Search');
  const [ poster, setPoster ] = useState('');
  const [ videos, setVideos ] = useState<string[]>([]);
  const [ savedVideosDetails, setSavedVideosDetails ] = useState<SavedVideosDetails[] | undefined>(undefined);
  const navigate = useNavigate();
  
  //Function that handles the rendering and disrendering and the content of the error message
  function handleErrorMessage(message: string): void {
    clearTimeout(showErrorMessage);
    setErrorMessage(message);
    setShowErrorMessage(setTimeout(() => setIsErrorMessage(false), 1400));
    setIsErrorMessage(true);
  }

  useEffect(() => {
    const isUser = localStorage.getItem('isUser') ? JSON.parse(localStorage.getItem('isUser') as string) : false;
    const token = localStorage.getItem('token') ? localStorage.getItem('token') as string : false;
    isDarkMode 
    ? document.documentElement.classList.add('darkmode') 
    : document.documentElement.classList.remove('darkmode');

    if ((token && isUser) || token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && (decodedToken.exp < currentTime)) {
        navigate('/login');
      }
      
    } else if (isUser) {
      navigate('/login');
    } else {
      navigate('/register');
    }
  }, [isDarkMode]);
  
  return (
    <Routes>
      <Route path="/home" element={
        <Home
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
          setPoster={setPoster}
        />
      } />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="disc/:id" element={
        <SavedVideos
          setTranslate={setTranslate}
          translate={translate}
          discs={discs}
          setDiscs={setDiscs}
          handleErrorMessage={handleErrorMessage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          errorMessage={errorMessage}
          isErrorMessage={isErrorMessage}
          setWatchTitle={setWatchTitle}
          setPoster={setPoster}
          savedVideosDetails={savedVideosDetails}
          setSavedVideosDetails={setSavedVideosDetails}
          videos={videos}
          setVideos={setVideos}
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
          setIsDarkMode={setIsDarkMode}
          isErrorMessage={isErrorMessage}
          errorMessage={errorMessage}
          watchTitle={watchTitle}
          setWatchTitle={setWatchTitle}
          poster={poster}
          savedVideosDetails={savedVideosDetails}
          setSavedVideosDetails={setSavedVideosDetails}
          setPoster={setPoster}
          layout="watch-panel"
          videos={videos}
          setVideos={setVideos}
        />
      } />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/register" element={
        <Authentication 
          errorMessage={errorMessage}
          isErrorMessage={isErrorMessage}
          handleErrorMessage={handleErrorMessage}
          layout="register"
        />
      } />
      <Route path="/login" element={
        <Authentication 
          errorMessage={errorMessage}
          isErrorMessage={isErrorMessage}
          handleErrorMessage={handleErrorMessage}
          layout="login"
        />
      } />
    </Routes>
  );
}