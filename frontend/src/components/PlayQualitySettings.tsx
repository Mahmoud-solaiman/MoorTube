import { useVideoQualityOptions } from '@vidstack/react';
import './PlayQualitySettings.scss';
import { PlayQualityProps } from '../../utils/types';

export default function PlayQualitySettings({
  setIsQuality,
  setIsSettings 
}: PlayQualityProps) {
  const qualities = useVideoQualityOptions({ auto: true, sort: 'ascending'});

  console.log(qualities.selectedQuality?.height);
  return (
    <div className="video-qualities-container">
      <h4 onClick={() => {
        setIsSettings(true);
        setIsQuality(false);
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z" />
        </svg>
        Quality
      </h4>

      <ul className="qualities-area">
        <li className="quality">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
          </svg>
          <span>Auto</span>
        </li>
      </ul>
    </div>
  );
}