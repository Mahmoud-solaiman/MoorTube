import { useMediaRemote } from '@vidstack/react';
import './PlaySpeedControls.scss';
import { useState } from 'react';
import { PlaySpeedControlsProps } from '../../utils/types';

export default function PlaySpeedControls({
    setIsSpeedSettings,
    setIsSettings
  }: PlaySpeedControlsProps) {
  const remote = useMediaRemote();
  const defaultSpeeds: number[] = [0.5, 0.75, 1, 1.5, 2];
  const speedStorage = sessionStorage.getItem('speed');
  const [ speedLabel, setSpeedLabel ] = useState(speedStorage ? JSON.parse(speedStorage) : 1);
  return (
    <div className="speed-controls-container">
      <h4 onClick={() => {
        setIsSettings(true);
        setIsSpeedSettings(false);
      }}>&#60; Playback speed</h4>

      <div className="controls-area">
        <span>{speedLabel.toFixed(2)}x</span>
        <div className="custom-speed">
          <button type="button">-</button>
          <input type="range" name="custom-speed" id="custom-speed" placeholder="enter speed" />
          <button type="button">+</button>
        </div>

        <div className="default-speeds">
          {
            defaultSpeeds.map(speed => {
              return <button type="button" onClick={()=> {
                remote.changePlaybackRate(speed);
                setSpeedLabel(speed);
                sessionStorage.setItem('speed', JSON.stringify(speed));
              }}>{speed}</button>;
            })
          }
        </div>
      </div>
    </div>
  );
}