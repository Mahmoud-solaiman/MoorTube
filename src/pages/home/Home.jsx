import { useState, useEffect } from "react"; // Import these hooks from the react package
import { Header } from "../../components/Header"; // Import the header component
import { ChannelVideos } from "../../components/ChannelVideos"; // Import the ChannelVideos component
import { SidePanel } from "../../components/SidePanel"; // Import the SidePanel component
import { ErrorMessage } from "../../components/ErrorMessage"; // Import the ErrorMessage component
import { SearchVideos } from "../../components/SearchVideos"; // Import the SearchVideos component
import { WebIntro } from "./WebIntro";

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
    setVideoPlayerSrc,
    setWatchTitle
  }) {
  //Variables and states that are shared across the app
  const [ channelVideos, setChannelVideos ] = useState(JSON.parse(sessionStorage.getItem('channel-videos')) || {}); // The videos for a specific channels returned from the channel filter
  const [ videos, setVideos ] = useState(JSON.parse(sessionStorage.getItem('videos')) || {}); // Videos returned from the video filter
  const [ popUpChannelLogo, setPopUpChannelLogo ] = useState(null); // State for the logos of the search popup
  const [ channelLogo, setChannelLogo ] = useState(JSON.parse(sessionStorage.getItem('channel-logo')) || {}); // Channel logo of the channel filter
  const [ channelsLogos, setChannelsLogos ] = useState(JSON.parse(sessionStorage.getItem('channels-logos')) || {}); //Logo of the picked channel
  const [ isChannel, setIsChannel ] = useState(true); // This is the state used to determine the search criterion (e.g. channel or video)
  
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
      sessionStorage.setItem('videos', null);
      sessionStorage.setItem('channels-logos', null);
      sessionStorage.setItem('channel-videos', null);
      sessionStorage.setItem('channel-logo', null);
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
      />
      {/* Render the SidePanel */}
      {
        (translate || translate === 0) &&
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
        <ChannelVideos
          channelLogo={channelLogo}
          videos={channelVideos}
          setDiscs={setDiscs}
          setTranslate={setTranslate}
          handleErrorMessage={handleErrorMessage}
          setVideoPlayerSrc={setVideoPlayerSrc}
        />
      }
      {
        (channelsLogos.items && !isChannel) &&
        // Render the SearchVideos conditionally
        <SearchVideos
          channelLogo={channelsLogos}
          videos={videos}
          setDiscs={setDiscs}
          setTranslate={setTranslate}
          handleErrorMessage={handleErrorMessage}
          setVideoPlayerSrc={setVideoPlayerSrc}
        />
      }
      {
        (!channelVideos.items && !channelsLogos.items) && <WebIntro isDarkMode={isDarkMode} />
      }
    </>
  );
}