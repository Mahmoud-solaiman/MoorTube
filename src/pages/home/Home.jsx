import { useRef, useState, useEffect } from "react"; // Import these hooks from the react package
import { Header } from "../../components/Header"; // Import the header component
import { ChannelVideos } from "../../components/ChannelVideos"; // Import the ChannelVideos component
import { SidePanel } from "../../components/SidePanel"; // Import the SidePanel component
import { ErrorMessage } from "../../components/ErrorMessage"; // Import the ErrorMessage component
import { SearchVideos } from "../../components/SearchVideos"; // Import the SearchVideos component

export function Home() {
  //Variables and states that are shared across the app
  const [ channelVideos, setChannelVideos ] = useState({}); // The videos for a specific channels returned from the channel filter
  const [ videos, setVideos ] = useState({}); // Videos returned from the video filter
  const [ popUpChannelLogo, setPopUpChannelLogo ] = useState(null); // State for the logos of the search popup
  const [ channelLogo, setChannelLogo ] = useState(''); // Channel logo of the channel filter
  const [ channelsLogos, setChannelsLogos ] = useState(''); //Logo of the picked channel
  const [ translate, setTranslate ] = useState(false); //The translateY value of the SidePanel
  const api_key = "AIzaSyBCuuLWqdp3M6gbyjAFnhBuF0vaat-zDqw"; //My google console API Key
  const menuContainer = useRef(null); //The reference of the menu container
  const [ discs, setDiscs ] = useState(JSON.parse(localStorage.getItem('current-discs')) || []); //The latest disc list from localStorage
  const [ errorMessage, setErrorMessage ] = useState(null); //The error message state
  const [ isErrorMessage, setIsErrorMessage ] = useState(false); //State to render and disrender the error message
  const [ showErrorMessage, setShowErrorMessage ] = useState(null); //State to handle the setTimeout for disrendering the error message
  const [ isChannel, setIsChannel ] = useState(true); // This is the state used to determine the search criterion (e.g. channel or video)

  //Function that handles the rendering and disrendering and the content of the error message
  function handleErrorMessage(message) {
    clearTimeout(showErrorMessage);
    setErrorMessage(message);
    setShowErrorMessage(setTimeout(() => setIsErrorMessage(false), 1400));
    setIsErrorMessage(true);
  }

  useEffect(() => {
    window.addEventListener('offline', () => {
      handleErrorMessage("No internet");
    });

    window.addEventListener('online', () => {
      handleErrorMessage("Back online");
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
        />
      }
    </>
  );
}