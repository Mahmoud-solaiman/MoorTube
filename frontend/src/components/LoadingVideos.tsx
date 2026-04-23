import './LoadingVideos.scss';

export default function LoadingVideos() {
  return (
    <div className="loader-container">
      {
        Array.from({ length: 9 }).map((_, index) => {
          return (
            <div className="loader-video" key={index}>
              <div className="loader-img"></div>
              <div className="loader-info-container">
                <div className="loader-channel"></div>
                <div className="loader-details">
                  <div className="loader-title"></div>
                  <div className="loader-subtitle"></div>
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}