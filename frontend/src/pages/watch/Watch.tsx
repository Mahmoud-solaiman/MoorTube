import { SavedVideosHeader } from '../saved-videos/SavedVideosHeader';
import { SidePanel } from '../../components/SidePanel';
import { ErrorMessage } from '../../components/ErrorMessage';
import './Watch.scss';
import { VideoPlayer } from './VideoPlayer';
import WatchPanel from './WatchPanel';
import { WatchProps } from '../../types/types';

export function Watch({
  setTranslate,
  menuContainer,
  isDarkMode,
  translate,
  discs,
  setDiscs,
  handleErrorMessage,
  setIsDarkMode,
  isErrorMessage,
  errorMessage,
  watchTitle,
  setWatchTitle,
  poster,
  savedVideosDetails,
  setSavedVideosDetails,
  setPoster,
  layout,
  videos,
  setVideos
}: WatchProps) {
  return (
    <>
      {
        isErrorMessage &&
        <ErrorMessage errorMessage={errorMessage} />
      }
      <SavedVideosHeader
        discName={watchTitle}
        setTranslate={setTranslate}
        menuContainer={menuContainer}
        isDarkMode={isDarkMode}
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
      {
        translate &&
        <SidePanel
          setTranslate={setTranslate}
          menuContainer={menuContainer}
          discs={discs}
          setDiscs={setDiscs}
          handleErrorMessage={handleErrorMessage}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setWatchTitle={setWatchTitle}
        />
      }
    </>
  );
}