import { useNavigate } from 'react-router-dom';
import './SavedVideosPanel.scss';

export function SavedVideosPanel({ savedVideos, video, savedVideosDetails }) {
  const navigate = useNavigate();

  return (
    <aside className="panel-outer" style={{
      backgroundImage: `url(${video?.snippet.thumbnails.maxres?.url ||
        video?.snippet.thumbnails.standard?.url ||
        video?.snippet.thumbnails.high?.url ||
        video?.snippet.thumbnails.medium?.url ||
        video?.snippet.thumbnails.default?.url
        })`
    }}>
      <section className="panel-inner">
        <div className="top-video-container">
          <div
            className="top-video-navigator"
            aria-hidden="true"
            onClick={() => navigate(`/watch?v=${video.id}`)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
            </svg>
            Play
          </div>
          <img
            src={
              video?.snippet.thumbnails.maxres?.url ||
              video?.snippet.thumbnails.standard?.url ||
              video?.snippet.thumbnails.high?.url ||
              video?.snippet.thumbnails.medium?.url ||
              video?.snippet.thumbnails.default?.url
            }
            alt="Top video thumbnail"
            className="top-video-thumbnail"
          />
        </div>
        <div className="disc-details">
          <h2>{savedVideos.name}</h2>
          <p>{savedVideosDetails.length} &#8226; {savedVideos.items.length === 1 ? "video" : "videos"}</p>
        </div>
      </section>
    </aside>
  );
}