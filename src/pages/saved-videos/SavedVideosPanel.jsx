import { useNavigate } from 'react-router-dom';
import './SavedVideosPanel.scss';

export function SavedVideosPanel({ savedVideos, video }) {
  const navigate = useNavigate();

  return (
    <aside className="panel-outer" style={{
      backgroundImage: `url(${
        video?.snippet.thumbnails.maxres?.url ||
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
          ></div>
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
          <p>{savedVideos.items.length} &#8226; {savedVideos.items.length === 1 ? "video" : "videos"}</p>
        </div>
      </section>
    </aside>
  );
}