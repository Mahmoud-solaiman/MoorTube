import './ToggleSearch.scss'; // The style sheet of this component

// The JSX of this component
export function ToggleSearch({ toggleSearch, setWatchTitle }) {
  return (
    <div className="toggle-search-container">
      Search for:
      <input type="radio" name="search" id="video" />
      <div className="video-radio-btn-container">
        <div className="video-radio-btn"></div>
      </div>
      <label
        htmlFor="video"
        onPointerUp={() => {
          toggleSearch(false);
          setWatchTitle('Video search');
        }}
        title="Video"
      > Video </label>
      <input
        defaultChecked
        type="radio"
        name="search"
        id="channel"
      />
      <div className="channel-radio-btn-container">
        <div className="channel-radio-btn"></div>
      </div>
      <label
        htmlFor="channel"
        onPointerUp={() => {
          toggleSearch(true);
          setWatchTitle('Channel search');
        }}
        title="Channel"
      > Channel </label>
    </div>
  );
}