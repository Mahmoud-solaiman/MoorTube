import { useNavigate } from 'react-router-dom';
import './SavedVideosPanel.scss';
import { SavedVideosPanelProps } from '../../../utils/types';
// import React from 'react';
import { useRef, useEffect } from 'react';

export function SavedVideosPanel({
  savedVideos,
  savedVideosDetails,
  setPoster
}: SavedVideosPanelProps) {
  const navigate = useNavigate();

  const highestResUrl = savedVideosDetails &&
    (
      savedVideosDetails[0]?.snippet.thumbnails.maxres?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.standard?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.high?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.medium?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.default?.url
    );
  const sidePanel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sidePanel.current && highestResUrl) {
      sidePanel.current.style.setProperty('--bg-image', `url(${highestResUrl})`);
    }
  }, [highestResUrl]);

  
  return (
    // eslint-disable-next-line no-inline-styles
    <aside
      ref={sidePanel}
      className="panel-outer"
      // style={{'--bg-image': `url(${highestResUrl})`} as React.CSSProperties} 
    >
      <section className="panel-inner">
        <div className="top-video-container">
          <div
            className="top-video-navigator"
            aria-hidden="true"
            onClick={() => {
              navigate(`/watch?v=${savedVideosDetails && savedVideosDetails[0].id}`);
              setPoster(highestResUrl);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
            </svg>
            Play
          </div>
          <img
            src={highestResUrl}
            alt="Top video thumbnail"
            className="top-video-thumbnail"
          />
        </div>
        <div className="disc-details">
          <h2>{savedVideos.name}</h2>
          <p>{savedVideosDetails && savedVideosDetails.length} &#8226; {savedVideos.items.length === 1 ? "video" : "videos"}</p>
        </div>
      </section>
    </aside>
  );
}