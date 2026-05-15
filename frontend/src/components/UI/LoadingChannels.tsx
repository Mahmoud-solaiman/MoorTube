import './LoadingChannels.scss';

export default function LoadingChannels() {
  return (
    <div className="loading-channels-container">
      {
        Array.from({length: 4}).map((_, index) => {
          return (
            <div className="loading-channel" key={index}>
              <div className="loading-img"></div>
              <div className="channel-loading-info">
                <div></div>
                <div></div>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}