import axios from "axios"; // Import axios from the axios package
import { useEffect, useRef, useState } from 'react'; // Import the useState hook from react package
import './Search.scss'; // Import the style sheet of this component

export function Search({
  isChannel,
  apiKey,
  setIsSuggestions,
  handleErrorMessage,
  setChannelsLogos,
  setVideos,
  setPopUpChannelLogo
}) {
  const [ searchText, setSearchText ] = useState(''); // The state of the search field to control its value
  const searchField = useRef(null);

  // The function that handles request to pull the logo, channel name, and channel handler from the YouTube data API 
  async function fetchChannelsData() {
    // If the search filter is set to channel, then search for channels using the following
    if (isChannel && searchText.trim()) {
      //This initial request handles pulling the channel IDs using regular text search keywords rather than handlers or IDs
      const channelsRequest = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: searchText,
          key: apiKey,
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
          key: apiKey,
          id: channelsRequest.data.items.map(item => item.id.channelId).join(',') // We loop through the channels set up the new request to pull up the needed data for all of the returned channels
        }
      });

      // Then we set the response to that final result to be used to render the channels visually in the suggestions popup
      setPopUpChannelLogo(channelInfo.data);
      setSearchText(''); // Then set the search field value back to empty for better UX
      setIsSuggestions(true); // Then finally show those channels of the desired user search visually in the search suggestion popup
    }
    // End of logic if the search is for a channel

    // If search filter is set to video, then search for videos instead
    if (!isChannel && searchText.trim()) {
      const videosRequest = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: searchText,
          key: apiKey,
          maxResults: 50,
          type: 'video'
        }
      });

      const channelsLogos = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
          part: 'snippet',
          key: apiKey,
          id: videosRequest.data.items.map(item => item.snippet.channelId).join(',')
        }
      });

      const videosDetails = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          key: apiKey,
          id: videosRequest.data.items.map(item => item.id.videoId).join(',')
        }
      });


      setChannelsLogos(channelsLogos.data);
      sessionStorage.setItem('channels-logos', JSON.stringify(channelsLogos.data));
      setVideos(videosDetails.data);
      sessionStorage.setItem('videos', JSON.stringify(videosDetails.data));
      setSearchText('');
    }
    // If the search field is empty 
    if (!searchText.trim()) {
      handleErrorMessage("Search input can't be an empty value.");
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', e => {
      if (e.key === '/') {
        searchField.current.focus();
      }
    });
  })



  // The JSX of the search related elements (e.g. search field and button)
  return (
    <div className='search-container'>
      <input
        id="search-channel-field"
        ref={searchField}
        placeholder={
          isChannel ?
            "Search for a channel" :
            "Search for a video"
        }
        value={searchText}
        type="text"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            fetchChannelsData();
          }
        }}
      />
      <button
        className="search-btn"
        onPointerUp={() => {
          fetchChannelsData();
        }}
        title="Search button"
      >
        <svg xmlns="../assets/search.svg" viewBox="0 0 640 640">
          <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
        </svg>
      </button>
    </div>
  );
}