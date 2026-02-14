// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';
import {
  MediaPlayer,
  MediaProvider,
  TimeSlider,
  Gesture
} from '@vidstack/react';
import './VideoPlayer.scss';
import { useState } from 'react';
import { Controls } from './Controls';

export function VideoPlayer({ videoPlayerSrc }) {
  const [ isPlaying, setIsPlaying ] = useState(true);
  const [ isBlur, setIsBlur ] = useState(false);

  return (
    <MediaPlayer
      title="Sprite Fight"
      src={videoPlayerSrc}
      autoPlay
      className="player-container"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <MediaProvider />
      <Gesture className="vds-gesture" event="dblpointerup" action="toggle:fullscreen" />
      <Gesture className="vds-gesture" event="pointerup" action="toggle:paused"/>

      { 
        isBlur && 
        <div aria-label="blur" aria-hidden="true" className="blur-layer"></div>
      }

      <TimeSlider.Root className="timeslider" >
        <TimeSlider.Track className="timeslider-track" />
        <TimeSlider.TrackFill className="timeslider-trackfill" />
        <TimeSlider.Progress className="timeslider-progress" />
        <TimeSlider.Thumb className="timeslider-thumb" />
      </TimeSlider.Root>

      <Controls isPlaying={isPlaying} isBlur={isBlur} setIsBlur={setIsBlur} />
      
    </MediaPlayer>
  );
}