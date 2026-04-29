import { VideoPlayerSettingsProps } from '../../../utils/types';
import './VideoPlayerSettings.scss';

export default function VideoPlayerSettings({
    setIsSpeedSettings,
    setIsSettings,
    setIsQuality
  }: VideoPlayerSettingsProps) {
  return (
    <div className="settings-container">
      <h3 className="settings-title">Settings...</h3>
      <ul className="settings">
        <li className="setting">
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
        <li className="setting" onClick={() => {
          setIsSettings(false);
          setIsQuality(true);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path d="M14.75 16.5h1.5V15H17q.425 0 .713-.288T18 14v-4q0-.425-.288-.713T17 9h-3q-.425 0-.713.288T13 10v4q0 .425.288.713T14 15h.75v1.5ZM6 15h1.5v-2h2v2H11V9H9.5v2.5h-2V9H6v6Zm8.5-1.5v-3h2v3h-2ZM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Z"/>
          </svg>
          <span className="setting-title">Quality</span>
        </li>
        <li className="setting">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M320 115.3L156.8 176.4L311.5 235.1C317 237.2 323 237.2 328.5 235.1L483.2 176.4L320 115.3zM64 193.3C64 173.3 76.4 155.4 95.1 148.4L303.1 70.4C314 66.3 325.9 66.3 336.8 70.4L544.8 148.4C563.5 155.4 575.9 173.3 575.9 193.3L575.9 229.3L322.7 325.3C320.9 326 318.9 326 317 325.3L63.8 229.3L63.8 193.3zM64 333.3L64 280.6L300.1 370.2C312.9 375.1 327 375.1 339.8 370.2L575.9 280.6L575.9 333.3L447.9 381.9L447.9 433.2L575.9 384.6L575.9 446.8C575.9 466.8 563.5 484.7 544.8 491.7L336.8 569.7C325.9 573.8 314 573.8 303.1 569.7L95.1 491.7C76.4 484.7 64 466.7 64 446.7L64 384.5L192 433.1L192 381.8L64 333.2zM300.1 474.1C312.9 479 327 479 339.8 474.1L399.9 451.3L399.9 400L322.7 429.3C320.9 430 318.9 430 317 429.3L239.8 400L239.8 451.3L299.9 474.1z"/>
          </svg>
          <span className="setting-title">Prayer timer</span>
        </li>
        <li className="setting">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M64 96C81.7 96 96 110.3 96 128L96 352L320 352L320 224C320 206.3 334.3 192 352 192L512 192C565 192 608 235 608 288L608 512C608 529.7 593.7 544 576 544C558.3 544 544 529.7 544 512L544 448L96 448L96 512C96 529.7 81.7 544 64 544C46.3 544 32 529.7 32 512L32 128C32 110.3 46.3 96 64 96zM144 256C144 220.7 172.7 192 208 192C243.3 192 272 220.7 272 256C272 291.3 243.3 320 208 320C172.7 320 144 291.3 144 256z"/>
          </svg>
          <span className="setting-title">Sleep timer</span>
        </li>
      </ul>
    </div>
  );
}