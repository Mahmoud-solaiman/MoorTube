import './Suggestions.scss'; // Import the style sheet of this component
import LoadingChannels from '../../components/UI/LoadingChannels';
import { ChannelVideosResponse, SearchHistory, SuggestionsProps } from '../../types/types';
import { RefObject, useEffect, useRef } from 'react';
import API from '../../api/axios';

export function Suggestions({
  popUpChannelLogo,
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
  const searchSuggestionsRef = useRef<HTMLDivElement[]>([]);
  const suggestionTextsRef = useRef<HTMLDivElement[]>([]);
  const channelsSuggestionsRef = useRef<HTMLDivElement[]>([]);
  const indexRef = useRef<number>(-1);

  // The function that fetches the videos of the desired channel
  const fetchChannelVideos = async (index: number) => {
    setIsSuggestions(false); // Hide the suggestions component
    setChannelVideos({});
    setIsLoading(true);

    const videos = await API.get<ChannelVideosResponse>('/youtube/channel', {
      params: {
        id: popUpChannelLogo.items?.[index].id
      }
    })

    setChannelVideos(videos.data.videoStats); // Set the videos (thumbnail, title, and channel name)
    sessionStorage.setItem('channel-videos', JSON.stringify(videos.data.videoStats));
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

  const handleNavigation = (e: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>, elementsList: RefObject<HTMLDivElement[]> , type: 'history' | 'channels') => {
    if (e.key === 'ArrowDown') {
      indexRef.current++;
      if (indexRef.current >= elementsList.current.length) {
        indexRef.current = 0;
      }

      elementsList.current[indexRef.current].focus();

    } else if (e.key === 'ArrowUp') {
      indexRef.current--;
      if (indexRef.current < 0) {
        indexRef.current = elementsList.current.length - 1;
      }
      elementsList.current[indexRef.current].focus();

    } else if (e.key === 'Enter') {
      type === 'history' 
      ? suggestionTextsRef.current[indexRef.current].click()
      : elementsList.current[indexRef.current].click();
      
      indexRef.current = -1;
    }
  }

  useEffect(() => {
    const inputFieldElem = searchField.current;
    const handleKeyUp = (e: KeyboardEvent | React.KeyboardEvent<HTMLDivElement>) => {
      if (channelsSuggestionsRef.current.length) {
        handleNavigation(e, channelsSuggestionsRef, 'channels');
      } else {
        handleNavigation(e, searchSuggestionsRef, 'history');
      }
    }

    const resetIndex = () => indexRef.current = -1;
    inputFieldElem?.addEventListener('keydown', handleKeyUp);
    inputFieldElem?.addEventListener('focus', resetIndex);
    inputFieldElem?.addEventListener('input', () => channelsSuggestionsRef.current = []);

    return () => {
      inputFieldElem?.removeEventListener('keydown', handleKeyUp); 
      inputFieldElem?.removeEventListener('focus', resetIndex);
    }
  }, []);
  // The JSX of the Suggestions component
  return (
    <div className="suggestions-box">
      {
        popUpChannelLogo?.items &&
        popUpChannelLogo.items.map((item, index) => {
          return (
            <div
              key={item.id} 
              className="suggestion"
              onClick={() => fetchChannelVideos(index)}
              tabIndex={0}
              ref={elem => {
                if (elem) channelsSuggestionsRef.current[index] = elem;
              }}
              onKeyDown={e => handleNavigation(e, channelsSuggestionsRef, 'channels')}
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
                  tabIndex={0}
                  onKeyDown={e => handleNavigation(e, searchSuggestionsRef, 'history')}
                  ref={elem => {
                    if (elem) searchSuggestionsRef.current[index] = elem
                  }}
                  onMouseEnter={() => {
                    if (searchField.current)
                      searchField.current.value = searchText + item.searchName.slice(searchText.length);
                  }}

                  onMouseLeave={() => {
                    if (searchField.current)
                      searchField.current.value = searchText;
                  }}
                  onFocus={() => {
                    if (searchField.current) {
                      searchField.current.value = item.searchName;
                    }
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
                      searchField.current?.focus();
                    }}
                    ref={elem => {
                      if (elem) suggestionTextsRef.current[index] = elem;
                    }}
                  >
                    {searchText}
                    <span className="match-bold">{item.searchName.slice(searchText.length)}</span>
                  </div>

                  <div className="delete-btn-container">
                    <svg onClick={() => deleteHistorySuggestion(item.key)} className="suggestion-delete-btn" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
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