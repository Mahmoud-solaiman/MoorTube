// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';
import { MediaPlayer, MediaProvider, MediaSlider } from '@vidstack/react';
import './VideoPlayer.scss';

export function VideoPlayer({ videoPlayerSrc }) {
  return (
    <div className="video-player">
      <MediaPlayer 
        title="Sprite Fight" 
        src={videoPlayerSrc}
        autoPlay
        className="player-container"
      >
        <MediaProvider />
      </MediaPlayer>
    </div>
  );
}