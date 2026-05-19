import { useEffect, useState } from 'react';
import PrayerTimesPanel from './PrayerTimesPanel';
import './WatchPanel.scss';
import { SavedVideosDetailsResponse, WatchPanelProps } from '../../types/types';
import { SavedVideosGrid } from '../saved-videos/SavedVideosGrid';
import { useSearchParams } from 'react-router-dom';
import API from '../../api/axios';

function WatchPanel({
  savedVideosDetails,
  setSavedVideosDetails,
  handleErrorMessage,
  setPoster,
  layout,
  videos,
  setVideos
}: WatchPanelProps) {
  const toggleLabels: string[] = ['prayers', 'videos'];
  const [panelChoice, setPanelChoice] = useState('prayers');

  const [ searchParams ] = useSearchParams();

  useEffect(() => {
    try {
      const fetchSavedVideos = async () => {
        const videos = await API.get<SavedVideosDetailsResponse>(`/discs/${searchParams.get('discId')}`);
        setSavedVideosDetails(videos.data.videos.items);
        setVideos(videos.data.disc.videos);
      }
      fetchSavedVideos();

    } catch (error: any) {
      const errorMessage = error.response?.data.message || "Server error. Please, try again later!";
      handleErrorMessage(errorMessage);
    }

  }, []);

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
          videos={videos}
          setVideos={setVideos}
        />
      }

    </aside>
  );
}

export default WatchPanel;