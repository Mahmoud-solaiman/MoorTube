import PrayerTimesPanel from './PrayerTimesPanel';
import './WatchPanel.scss';

function WatchPanel() {
  const toggleLabels = ['prayers', 'videos'];

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
                <label htmlFor={item}>{item.slice(0, 1).toUpperCase() + item.slice(1)}</label>
              </div>
            )
          })
        }
      </header>

      <PrayerTimesPanel />
    </aside>
  );
}

export default WatchPanel;