import { useState, useEffect } from "react"; // Import these hooks from the react package
import { Header } from "../../components/Header"; // Import the header component
import { SidePanel } from "../../components/SidePanel"; // Import the SidePanel component
import { ErrorMessage } from "../../components/ErrorMessage"; // Import the ErrorMessage component
import LoadingVideos from "../../components/LoadingVideos";
import type { HomeProps } from  "../../../utils/types.ts";
import { VideoGrid } from "../../components/VideoGrid.jsx";

export function Home({ 
    setSavedVideos, 
    api_key,
    setTranslate,
    translate,
    menuContainer,
    discs,
    setDiscs,
    handleErrorMessage,
    isErrorMessage,
    errorMessage,
    isDarkMode,
    setIsDarkMode,
    setWatchTitle,
    setPoster
  }: HomeProps) {
  //Variables and states that are shared across the app
  const channelVideosStorage = sessionStorage.getItem('channel-videos');
  const videosStorage = sessionStorage.getItem('videos');
  const channelLogoStorage = sessionStorage.getItem('channel-logo');
  const channelsLogosStorage = sessionStorage.getItem('channels-logos');
  const [ channelVideos, setChannelVideos ] = useState(channelVideosStorage ? JSON.parse(channelVideosStorage) : {}); // The videos for a specific channels returned from the channel filter
  const [ videos, setVideos ] = useState(videosStorage ? JSON.parse(videosStorage) : {}); // Videos returned from the video filter
  const [ popUpChannelLogo, setPopUpChannelLogo ] = useState({}); // State for the logos of the search popup
  const [ channelLogo, setChannelLogo ] = useState(channelLogoStorage ? JSON.parse(channelLogoStorage) : {}); // Channel logo of the channel filter
  const [ channelsLogos, setChannelsLogos ] = useState(channelsLogosStorage ? JSON.parse(channelsLogosStorage) : {}); //Logo of the picked channel
  const [ isChannel, setIsChannel ] = useState(true); // This is the state used to determine the search criterion (e.g. channel or video)
  const [ isLoading, setIsLoading ] = useState(false);

  
  useEffect(() => {
    window.addEventListener('offline', () => {
      handleErrorMessage("No internet");
    });

    window.addEventListener('online', () => {
      handleErrorMessage("Back online");
    });

    window.addEventListener('load', () => {
      setChannelVideos({});
      setVideos({});
      setChannelLogo({});
      setChannelsLogos({});
      sessionStorage.removeItem('videos');
      sessionStorage.removeItem('channels-logos');
      sessionStorage.removeItem('channel-videos');
      sessionStorage.removeItem('channel-logo');
    });
  });

  // The JSX of the Home component
  return (
    <>
      {
        isErrorMessage &&
        // Render the ErrorMessage conditionally
        <ErrorMessage
          errorMessage={errorMessage}
        />
      }
      {/* Render the Header */}
      <Header
        setVideos={setVideos}
        setChannelVideos={setChannelVideos}
        setChannelsLogos={setChannelsLogos}
        api_key={api_key}
        setTranslate={setTranslate}
        menuContainer={menuContainer}
        handleErrorMessage={handleErrorMessage}
        setIsChannel={setIsChannel}
        isChannel={isChannel}
        popUpChannelLogo={popUpChannelLogo}
        setPopUpChannelLogo={setPopUpChannelLogo}
        setChannelLogo={setChannelLogo}
        isDarkMode={isDarkMode}
        setWatchTitle={setWatchTitle}
        setIsLoading={setIsLoading}
      />
      {/* Render the SidePanel */}
      {
        translate &&
        <SidePanel
          translate={translate}
          setTranslate={setTranslate}
          menuContainer={menuContainer}
          discs={discs}
          setDiscs={setDiscs}
          handleErrorMessage={handleErrorMessage}
          setSavedVideos={setSavedVideos}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setWatchTitle={setWatchTitle}
        />
      }
      {
        (channelVideos.items && isChannel) &&
        // Render the ChannelVideos conditionally
        <VideoGrid
          channelLogo={channelLogo}
          videos={channelVideos}
          setDiscs={setDiscs}
          setTranslate={setTranslate}
          handleErrorMessage={handleErrorMessage}
          setPoster={setPoster}
        />
      }
      {
        (channelsLogos.items && !isChannel) &&
        // Render the SearchVideos conditionally
        <VideoGrid
          channelLogo={channelsLogos}
          videos={videos}
          setDiscs={setDiscs}
          setTranslate={setTranslate}
          handleErrorMessage={handleErrorMessage}
          setPoster={setPoster}
        />
      }
      {
        isLoading &&
        <LoadingVideos />
      }
    </>
  );
}