import { useState } from 'react';
import PrayerTimesPanel from './PrayerTimesPanel';
import './WatchPanel.scss';
import { WatchPanelProps } from '../../../utils/types';
import { SavedVideosGrid } from '../saved-videos/SavedVideosGrid';

function WatchPanel({
  savedVideosDetails,
  setSavedVideosDetails,
  setSavedVideos,
  handleErrorMessage,
  setPoster,
  layout
}: WatchPanelProps) {
  const toggleLabels: string[] = ['prayers', 'videos'];
  const [ panelChoice, setPanelChoice ] = useState('prayers');

  return (
    <aside className="watch-panel">
      <header className="watch-panel-header" >
        {
          toggleLabels.map((item, index) => {
            return (
              <div className="toggle-container" key={index}>
                <input defaultChecked={item === 'prayers' && true} type="radio" id={item} name="panel-display" />
                <div className="toggle-outer" aria-hidden="true">
                  <div className="toggle-inner" aria-hidden="true"></div>
                </div>
                <label htmlFor={item} onClick={() => setPanelChoice(item)}>{item.slice(0, 1).toUpperCase() + item.slice(1)}</label>
              </div>
            )
          })
        }
      </header>

      {
        panelChoice === 'prayers' &&
        <PrayerTimesPanel />
      }

      {
        panelChoice === 'videos' &&
        <SavedVideosGrid
          savedVideosDetails={savedVideosDetails}
          setSavedVideosDetails={setSavedVideosDetails}
          setSavedVideos={setSavedVideos}
          handleErrorMessage={handleErrorMessage}
          setPoster={setPoster}
          layout={layout}
        />
      }

    </aside>
  );
}

export default WatchPanel;