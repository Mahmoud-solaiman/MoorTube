import axios from "axios";
import { useRef, useState } from "react"; // Import the useState hook from the React Package
import { Search } from "../pages/home/Search"; // Import the Search component
import { Suggestions } from "../pages/home/Suggestions"; // Import the Suggestions component
import { ToggleSearch } from "./ToggleSearch"; // Import the ToggleSearch component
import './Header.scss'; // Import the style sheet of this component

export function Header({
  setVideos,
  setChannelVideos,
  setChannelsLogos,
  api_key,
  setTranslate,
  menuContainer,
  handleErrorMessage,
  setIsChannel,
  isChannel,
  popUpChannelLogo,
  setPopUpChannelLogo,
  setChannelLogo,
  isDarkMode
}) {
  const [ isSuggestions, setIsSuggestions ] = useState(false); // This state controls whether to show the channels search suggestions or not
  const [ searchHistory, setSearchHistory ] = useState(JSON.parse(localStorage.getItem('search-history')) || []);
  const [ searchText, setSearchText ] = useState(''); // The state of the search field to control its value
  const searchField = useRef(null);

  async function fetchChannelsData(search) {
    // If the search filter is set to channel, then search for channels using the following
    if (isChannel && search.trim()) {
      //This initial request handles pulling the channel IDs using regular text search keywords rather than handlers or IDs
      const channelsRequest = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: search,
          key: api_key,
          maxResults: 4,
          type: 'channel'
        }
      });

      /* 
        Then we take the ID of the 4 channels return from the previous request and make a new request
        to pull the channel logo, handler, and name 
      */
      const channelInfo = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet',
          key: api_key,
          id: channelsRequest.data.items.map(item => item.id.channelId).join(',') // We loop through the channels set up the new request to pull up the needed data for all of the returned channels
        }
      });

      // Then we set the response to that final result to be used to render the channels visually in the suggestions popup
      setPopUpChannelLogo(channelInfo.data);
      setSearchText(''); // Then set the search field value back to empty for better UX
      setIsSuggestions(true); // Then finally show those channels of the desired user search visually in the search suggestion popup
    
      // Add search to the history
      const isSuggestion = searchHistory.find(item => item.searchName.toLowerCase() === search.trim().toLowerCase());
      if (!isSuggestion) {
        searchHistory.push(
          {
            searchName: search.trim(),
            key: crypto.randomUUID()
          }
        );

        localStorage.setItem('search-history', JSON.stringify(searchHistory));
      }
    }
    // End of logic if the search is for a channel

    // If search filter is set to video, then search for videos instead
    if (!isChannel && search.trim()) {
      const videosRequest = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: search,
          key: api_key,
          maxResults: 50,
          type: 'video'
        }
      });

      const channelsLogos = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet',
          key: api_key,
          id: videosRequest.data.items.map(item => item.snippet.channelId).join(',')
        }
      });

      const videosDetails = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          key: api_key,
          id: videosRequest.data.items.map(item => item.id.videoId).join(',')
        }
      });


      setChannelsLogos(channelsLogos.data);
      sessionStorage.setItem('channels-logos', JSON.stringify(channelsLogos.data));
      setVideos(videosDetails.data);
      sessionStorage.setItem('videos', JSON.stringify(videosDetails.data));
      setSearchText('');
      setIsSuggestions(false);
    
      // Add search to the history
      const isSuggestion = searchHistory.find(item => item.searchName === search.trim().toLowerCase());
      
      if (!isSuggestion) {
        searchHistory.push(
          {
            searchName: search.trim(),
            key: crypto.randomUUID()
          }
        );

        localStorage.setItem('search-history', JSON.stringify(searchHistory));
      }
    }
    // If the search field is empty 
    if (!search.trim()) {
      handleErrorMessage("Search input can't be an empty value.");
    }
  }

  // The JSX of the Header component
  return (
    <>
      <header className="header">
        <div className="logo-menu-container">
          <div title="Menu" className="menu-container" ref={menuContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              onPointerUp={() => {
                setTranslate(0);
              }}
            >
              <path
                d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"
              />
            </svg>
          </div>
          <div className="logo-container" title="YouTube Organized">
            <img src={isDarkMode ? "./logo-dark.png" : "./logo-light.png"} alt="website logo" />
          </div>
        </div>

        <div className="search-area">
          {/* The Search component */}
          <Search
            isChannel={isChannel}
            setIsSuggestions={setIsSuggestions}
            setPopUpChannelLogo={setPopUpChannelLogo}
            setSearchHistory={setSearchHistory}
            searchText={searchText}
            setSearchText={setSearchText}
            fetchChannelsData={fetchChannelsData}
            searchField={searchField}
          />
          {/* The ToggleSearch component */}
          <ToggleSearch
            toggleSearch={setIsChannel}
          />
          {/* This renders the Suggestions component condictionally */}
          {
            isSuggestions &&
            // The Suggestions component
            <Suggestions
              popUpChannelLogo={popUpChannelLogo}
              apiKey={api_key}
              setChannelsLogos={setChannelsLogos}
              setIsSuggestions={setIsSuggestions}
              setChannelVideos={setChannelVideos}
              setChannelLogo={setChannelLogo}
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
              searchText={searchText}
              fetchChannelsData={fetchChannelsData}
              searchField={searchField}
              setSearchText={setSearchText}
            />
          }
        </div>
      </header>
    </>
  );
}