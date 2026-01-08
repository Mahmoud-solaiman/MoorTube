import { handleDuration, handleViewCount, youtubeTimeAgo } from '../../../formatting.js';
import './SavedVideosGrid.scss';

export function SavedVideosGrid({ savedVideosDetails }) {
  console.log(savedVideosDetails);
  return (
    <section className="saved-videos-grid">
      {
        savedVideosDetails ?
          savedVideosDetails.map((item, index) => {
            return (
              <div className="saved-video">
                <div className="sorting-method">{index + 1}</div>
                <div className="saved-video-details">
                  <div className="saved-video-thumbnail-container">
                    <img
                      src={
                        item.snippet.thumbnails.maxres?.url ||
                        item.snippet.thumbnails.standard?.url ||
                        item.snippet.thumbnails.high?.url ||
                        item.snippet.thumbnails.medium?.url ||
                        item.snippet.thumbnails.default?.url ||
                        "default-thumbnail"
                      }
                      alt="" className="saved-video-thumbnail"
                    />
                    <div className="saved-video-duration">{handleDuration(item.contentDetails.duration)}</div>
                  </div>
                  <div className="saved-video-info">
                    <h3 className="saved-video-title">{item.snippet.title}</h3>
                    <h4>{item.snippet.channelTitle} &#8226; {handleViewCount(item.statistics.viewCount)} &#8226; {youtubeTimeAgo(item.snippet.publishedAt)}</h4>
                  </div>
                </div>
                <div className="saved-video-controls">
                  <svg
                    xmlns="../assets/dots.svg"
                    viewBox="0 0 640 640"
                    className='three-dots-saved-video'
                  >
                    <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
                  </svg>
                </div>
              </div>
            );
          }) :
          "No videos"
      }
    </section>
  );
}