import './LoadingDiscs.scss';

export default function LoadingDiscs() {
  return (
    Array.from({ length: 5}).map((_, index) => {
      return (
        <div key={index} className="loading-disc" aria-hidden="true">
          <div className="loading-text" aria-hidden="true"></div>
          <div className="loading-settings-btn" aria-hidden="true"></div>
        </div>
      );
    })
  );
}