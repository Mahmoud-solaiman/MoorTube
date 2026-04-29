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
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
        </svg>
        Playback speed
      </h4>

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