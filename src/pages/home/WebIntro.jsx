import './WebIntro.scss';

export function WebIntro({ isDarkMode }) {
  return (
    <div className="web-intro-container">
      <div className="youtube-logo-container">
        <img src="./youtube.png" alt="YouTube logo" />
      </div>
      <div className="plus-sign">&#43;</div>
      <div className="no-distractions-text-container">
        <strong className="no-distractions-text">NO DISTRACTIONS</strong>
      </div>
      <div className="equals-sign">&#61;</div>
      <div className="web-logo-container">
        <img src={isDarkMode ? "./logo-dark.png" : "./logo-light.png"} alt="YouTube Organized logo" />
      </div>
    </div>
  );
}