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
  const [speedLabel, setSpeedLabel] = useState(speedStorage ? JSON.parse(speedStorage) : 1);
  const [rangeValue, setRangeValue] = useState(speedStorage ? JSON.parse(speedStorage) : 1);

  function updateSpeed(speed: number): void {
    remote.changePlaybackRate(speed);
    setSpeedLabel(speed);
    sessionStorage.setItem('speed', JSON.stringify(speed));
  }

  return (
    <div className="speed-controls-container">
      <h4 onClick={() => {
        setIsSettings(true);
        setIsSpeedSettings(false);
      }}>&#60; Playback speed</h4>

      <div className="controls-area">
        <span>{speedLabel.toFixed(2)}x</span>
        <div className="custom-speed">
          <button type="button" onClick={() => {
            setRangeValue(rangeValue > .25 ? rangeValue - .05 : 0.25);
            updateSpeed(Number(rangeValue));
          }}>-</button>
          <input
            min="0.25"
            max="2"
            step="0.05"
            type="range"
            placeholder="enter speed"
            value={rangeValue}
            onChange={e => {
              setRangeValue(e.currentTarget.value);
              updateSpeed(Number(e.currentTarget.value));
            }}
          />
          <button type="button" onClick={() => {
            setRangeValue(rangeValue < 2 ? rangeValue + .05 : 2);
            updateSpeed(Number(rangeValue));
          }}>+</button>
        </div>

        <div className="default-speeds">
          {
            defaultSpeeds.map((speed, index) => {
              return <button type="button" key={index} onClick={() => {                
                setRangeValue(speed);
                updateSpeed(speed);
              }}>{speed}</button>;
            })
          }
        </div>
      </div>
    </div>
  );
}