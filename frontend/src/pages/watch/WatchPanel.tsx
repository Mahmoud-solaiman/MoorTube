import { useState } from 'react';
import PrayerTimesPanel from './PrayerTimesPanel';
import './WatchPanel.scss';
import { WatchPanelProps } from '../../types/types';
import { SavedVideosGrid } from '../saved-videos/SavedVideosGrid';

function WatchPanel({
  savedVideosDetails,
  setSavedVideosDetails,
  handleErrorMessage,
  setPoster,
  layout,
  setDiscs,
  videos
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
          handleErrorMessage={handleErrorMessage}
          setPoster={setPoster}
          layout={layout}
          setDiscs={setDiscs}
          videos={videos}
        />
      }

    </aside>
  );
}

export default WatchPanel;