import { useState } from "react"; // Import the useState hook from the React Package
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
  setChannelLogo
}) {
  const [ isSuggestions, setIsSuggestions ] = useState(false); // This state controls whether to show the channels search suggestions or not
  const [ searchHistory, setSearchHistory ] = useState([]);
  const [ searchText, setSearchText ] = useState(''); // The state of the search field to control its value

  // The JSX of the Header component
  return (
    <>
      <header className="header">
        <div className="logo-menu-container">
          <div title="Menu" className="menu-container" ref={menuContainer}>
            <svg
              xmlns="../assets/menu.svg"
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
            <img src="/logo.png" alt="website logo" />
          </div>
        </div>

        <div className="search-area">
          {/* The Search component */}
          <Search
            isChannel={isChannel}
            apiKey={api_key}
            setIsSuggestions={setIsSuggestions}
            handleErrorMessage={handleErrorMessage}
            setChannelsLogos={setChannelsLogos}
            setVideos={setVideos}
            setPopUpChannelLogo={setPopUpChannelLogo}
            setSearchHistory={setSearchHistory}
            searchText={searchText}
            setSearchText={setSearchText}
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
              searchText={searchText}
            />
          }
        </div>
      </header>
    </>
  );
}