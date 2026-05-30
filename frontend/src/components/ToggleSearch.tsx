import { useEffect, useRef } from 'react';
import './ToggleSearch.scss'; // The style sheet of this component

// The JSX of this component
export function ToggleSearch({
  toggleSearch,
  setWatchTitle
}: { toggleSearch(value: boolean): void; setWatchTitle(value: string): void }) {
  const videoRef = useRef<HTMLLabelElement>(null);
  const channelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    const handleToggling = (e: KeyboardEvent) => {
      
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key).toLocaleLowerCase() === 'v') {
        e.preventDefault();
        videoRef.current?.click();
        
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key).toLocaleLowerCase() === 'c') {
        e.preventDefault();
        channelRef.current?.click();
      }
    };

    document.addEventListener('keydown', handleToggling);

    return () => document.removeEventListener('keydown', handleToggling);
  }, []);
  return (
    <div className="toggle-search-container">
      Search for:
      <input type="radio" name="search" id="video" />
      <div className="video-radio-btn-container">
        <div className="video-radio-btn"></div>
      </div>
      <label
        htmlFor="video"
        ref={videoRef}
        onClick={() => {
          toggleSearch(false);
          setWatchTitle('Video Search');
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
        ref={channelRef}
        onClick={() => {
          toggleSearch(true);
          setWatchTitle('Channel Search');
        }}
        title="Channel"
      > Channel </label>
    </div>
  );
}