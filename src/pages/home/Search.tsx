import { useEffect } from 'react'; // Import the useState hook from react package
import './Search.scss'; // Import the style sheet of this component
import { SearchHistory, SearchProps } from '../../../utils/types';

export function Search({
  isChannel,
  setIsSuggestions,
  setPopUpChannelLogo,
  setSearchHistory,
  searchText,
  setSearchText,
  fetchChannelsData,
  searchField
}: SearchProps) {
  const searchHistoryStorage = localStorage.getItem('search-history');
  const searchHistory: SearchHistory[] = searchHistoryStorage ? JSON.parse(searchHistoryStorage) : [];
  
  function recommendSearch(search: string) {
    const searchHistorySuggestions = searchHistory.filter(item => search && (search.toLowerCase() === item.searchName.slice(0, search.length).toLowerCase()));
    setSearchHistory(searchHistorySuggestions);

    if (searchHistorySuggestions.length) {
      setPopUpChannelLogo({});
      setIsSuggestions(true);
    } else if (!search || !searchHistorySuggestions.length) {
      setIsSuggestions(false);
      setSearchHistory(searchHistoryStorage ? JSON.parse(searchHistoryStorage) : []);
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', e => {
      if (e.key === '/' && searchField.current) {
        searchField.current.focus();
      }
    });
  })



  // The JSX of the search related elements (e.g. search field and button)
  return (
    <div className='search-container'>
      <input
        autoComplete="off"
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
          recommendSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            fetchChannelsData(e.currentTarget.value);
          }
        }}
      />
      <button
        className="search-btn"
        type="button"
        onPointerUp={() => {
          if (searchField.current)
            fetchChannelsData(searchField.current.value);
        }}
        title="Search button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
        </svg>
      </button>
    </div>
  );
}