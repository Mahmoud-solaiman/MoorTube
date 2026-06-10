import { SavedVideosHeader } from '../saved-videos/SavedVideosHeader';
import './Watch.scss';
import { VideoPlayer } from './VideoPlayer';
import WatchPanel from './WatchPanel';
import { WatchProps } from '../../types/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Watch({
  setTranslate,
  menuContainer,
  setDiscs,
  handleErrorMessage,
  watchTitle,
  poster,
  savedVideosDetails,
  setSavedVideosDetails,
  setPoster,
  layout,
  videos,
  setVideos
}: WatchProps) {
  const navigator = useNavigate();

  useEffect(() => {
    document.title = `MoorTube | Watch | ${watchTitle}`;

    const navigateToHome = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigator('/home');
      }
    }

    document.addEventListener('keyup', navigateToHome);

    return () => document.removeEventListener('keyup', navigateToHome);
  }, []);
  
  return (
    <>
      <SavedVideosHeader
        discName={watchTitle}
        setTranslate={setTranslate}
        menuContainer={menuContainer}
      />

      <div className="player-videos-container">
        <VideoPlayer poster={poster} />

        <WatchPanel
          savedVideosDetails={savedVideosDetails}
          setSavedVideosDetails={setSavedVideosDetails}
          handleErrorMessage={handleErrorMessage}
          setPoster={setPoster}
          layout={layout}
          setDiscs={setDiscs}
          videos={videos}
          setVideos={setVideos}
        />
      </div>
    </>
  );
}