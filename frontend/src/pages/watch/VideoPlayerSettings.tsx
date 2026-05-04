import { generateID } from '../../../utils/formatting';
import { VideoPlayerSettingsProps } from '../../../utils/types';
import './VideoPlayerSettings.scss';

export default function VideoPlayerSettings({
    setIsSpeedSettings,
    setIsSettings,
    setBlurBoxes,
    blurBoxes
  }: VideoPlayerSettingsProps) {
  return (
    <div className="settings-container">
      <h3 className="settings-title">Settings...</h3>
      <ul className="settings">
        <li className="setting" onClick={() => {
          setBlurBoxes([...blurBoxes, generateID()]);
          setIsSettings(false);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M96 96L96 224L224 224L224 96L96 96zM216 216L104 216L104 104L216 104L216 216zM256 96L256 224L384 224L384 96L256 96zM376 216L264 216L264 104L376 104L376 216zM416 96L416 224L544 224L544 96L416 96zM536 216L424 216L424 104L536 104L536 216zM96 256L96 384L224 384L224 256L96 256zM216 376L104 376L104 264L216 264L216 376zM256 256L256 384L384 384L384 256L256 256zM376 376L264 376L264 264L376 264L376 376zM416 256L416 384L544 384L544 256L416 256zM536 376L424 376L424 264L536 264L536 376zM96 416L96 544L224 544L224 416L96 416zM216 536L104 536L104 424L216 424L216 536zM256 416L256 544L384 544L384 416L256 416zM376 536L264 536L264 424L376 424L376 536zM416 416L416 544L544 544L544 416L416 416z"/>
          </svg>
          <span className="setting-title">Custom blur</span>
        </li>
        <li className="setting" onClick={() => {
          setIsSettings(false);
          setIsSpeedSettings(true);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM384 416C384 399.8 378 384.9 368 373.7L437.5 234.8C443.4 222.9 438.6 208.5 426.8 202.6C415 196.7 400.5 201.5 394.6 213.3L325.1 352.2C323.4 352.1 321.7 352 320 352C284.7 352 256 380.7 256 416C256 451.3 284.7 480 320 480C355.3 480 384 451.3 384 416z"/>
          </svg>
          <span className="setting-title">Playback speed</span>
        </li>
      </ul>
    </div>
  );
}