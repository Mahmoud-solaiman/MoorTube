import axios from 'axios'; // Import axios from the axios package
import './Suggestions.scss'; // Import the style sheet of this component

export function Suggestions({
  popUpChannelLogo,
  apiKey,
  setIsSuggestions,
  setChannelVideos,
  setChannelLogo,
  searchHistory,
  searchText
}) {
  // The function that fetches the videos of the desired channel
  const fetchChannelVideos = async (index) => {
    // Make request to YouTube API, channels resource, to pull the IDs of the playlist of the last 50 videos uploaded to that particular channel
    const request = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'contentDetails',
        key: apiKey,
        id: popUpChannelLogo.items[index].id
      }
    });

    // Then make a request to the YouTube API, playlistItems resource, to pull the videos of that channel
    const uploadPlaylistInfo = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        key: apiKey,
        part: 'snippet, contentDetails',
        playlistId: request.data.items[0].contentDetails.relatedPlaylists.uploads,
        maxResults: '50'
      }
    });

    // Make another request to the YouTube API, videos resource, to pull the duration, view count, and publish time
    const videoStats = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        key: apiKey,
        id: uploadPlaylistInfo.data.items.map(item => item.contentDetails.videoId).join(',')
      }
    });

    setChannelVideos(videoStats.data); // Set the videos (thumbnail, title, and channel name)
    sessionStorage.setItem('channel-videos', JSON.stringify(videoStats.data));
    setChannelLogo(popUpChannelLogo);
    sessionStorage.setItem('channel-logo', JSON.stringify(popUpChannelLogo));
    setIsSuggestions(false); // Hide the suggestions component
  }

  // The JSX of the Suggestions component
  return (
    <div className="suggestions-box">
      {popUpChannelLogo?.items ?
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
                  className="channel-icon" />
              </div>
              <div className="channel-semantics">
                <strong className="channel-name">{item.snippet.title}</strong>
                <br />
                <span className="channel-handle-name">{item.snippet.customUrl}</span>
              </div>
            </div>
          );
        }) :
        <div className="search-history">
          <div className="clear-history-container">
            <button 
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
                <div key={index} className="search-history-suggestion">
                  {searchText}
                  <span className="match-bold">{item.slice(searchText.length)}</span>
                </div>
              );
            })
          }
        </div>
      }
    </div>
  );
}