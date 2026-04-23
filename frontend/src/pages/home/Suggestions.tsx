import axios from 'axios'; // Import axios from the axios package
import './Suggestions.scss'; // Import the style sheet of this component
import LoadingChannels from '../../components/LoadingChannels';
import { PlaylistInfoItem, SearchHistory, SuggestionsProps } from '../../../utils/types';

export function Suggestions({
  popUpChannelLogo,
  apiKey,
  setIsSuggestions,
  setChannelVideos,
  setChannelLogo,
  searchHistory,
  setSearchHistory,
  searchText,
  fetchChannelsData,
  searchField,
  setSearchText,
  setIsLoading,
  isLoadingChannels
}: SuggestionsProps) {
  // The function that fetches the videos of the desired channel
  const fetchChannelVideos = async (index: number) => {
    setIsSuggestions(false); // Hide the suggestions component
    setChannelVideos({});
    setIsLoading(true);

    // Make request to YouTube API, channels resource, to pull the IDs of the playlist of the last 50 videos uploaded to that particular channel
    const request = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'contentDetails',
        key: apiKey,
        id: popUpChannelLogo.items?.[index].id
      }
    });

    // Then make a request to the YouTube API, playlistItems resource, to pull the videos of that channel
    const uploadPlaylistInfo = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        key: apiKey,
        part: 'snippet, contentDetails',
        playlistId: request.data.items[0].contentDetails.relatedPlaylists.uploads,
        maxResults: '27'
      }
    });

    // Make another request to the YouTube API, videos resource, to pull the duration, view count, and publish time
    const videoStats = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        key: apiKey,
        id: uploadPlaylistInfo.data.items.map((item: PlaylistInfoItem) => item.contentDetails.videoId).join(',')
      }
    });

    setChannelVideos(videoStats.data); // Set the videos (thumbnail, title, and channel name)
    sessionStorage.setItem('channel-videos', JSON.stringify(videoStats.data));
    setChannelLogo(popUpChannelLogo);
    sessionStorage.setItem('channel-logo', JSON.stringify(popUpChannelLogo));

    setIsLoading(false);
  }

  function deleteHistorySuggestion(key: string) {
    const currentHistoryStorage = localStorage.getItem('search-history');
    const currentHistory = currentHistoryStorage && JSON.parse(currentHistoryStorage);
    const updatedHistory = currentHistory.filter((item: SearchHistory) => item.key !== key);
    const updatedSuggestions = searchHistory.filter(item => item.key !== key);
    setSearchHistory(updatedSuggestions);

    !updatedSuggestions.length && setIsSuggestions(false);
    localStorage.setItem('search-history', JSON.stringify(updatedHistory));
  }

  // The JSX of the Suggestions component
  return (
    <div className="suggestions-box">
      {
        popUpChannelLogo?.items &&
        popUpChannelLogo.items.map((item, index) => {
          return (
            <div
              key={item.id} className="suggestion"
              onPointerUp={() => fetchChannelVideos(index)}
            >
              <div className="channel-icon-container">
                <img
                  src={
                    item.snippet?.thumbnails.default.url
                  }
                  alt="logo"
                  className="channel-icon" />
              </div>
              <div className="channel-semantics">
                <strong className="channel-name">{item.snippet.title}</strong>
                <br />
                <span className="channel-handle-name">{item.snippet.customUrl}</span>
              </div>
            </div>
          );
        })
      }

      {
        (!popUpChannelLogo?.items && !isLoadingChannels) &&
        <div className="search-history">
          <div className="clear-history-container">
            <button
              type="button"
              className="clear-history-btn"
              onClick={() => {
                localStorage.removeItem('search-history');
                setIsSuggestions(false);
              }}
            >clear history</button>
          </div>
          {
            searchHistory.map((item, index) => {
              return (
                <div
                  key={index}
                  className="search-history-suggestion"
                  onMouseEnter={() => {
                    if (searchField.current)
                      searchField.current.value = searchText + item.searchName.slice(searchText.length);
                  }}

                  onMouseLeave={() => {
                    if (searchField.current)
                      searchField.current.value = searchText;
                  }}
                >

                  <div className="clock-container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="clock" viewBox="0 0 640 640">
                      <path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z" />
                    </svg>
                  </div>

                  <div
                    className="suggestion-text"
                    onClick={() => {
                      setIsSuggestions(false);
                      setSearchText(item.searchName);
                      fetchChannelsData(item.searchName);
                    }}
                  >
                    {searchText}
                    <span className="match-bold">{item.searchName.slice(searchText.length)}</span>
                  </div>

                  <div className="delete-btn-container">
                    <svg onClick={() => deleteHistorySuggestion(item.key)} className="suggestion-delete-btn" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                      <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                    </svg>
                  </div>
                </div>
              );
            })
          }
        </div>
      }

      {
        isLoadingChannels &&
        <LoadingChannels />
      }
    </div>
  );
}