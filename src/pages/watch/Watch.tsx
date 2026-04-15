import { SavedVideosHeader } from '../saved-videos/SavedVideosHeader';
import { SidePanel } from '../../components/SidePanel';
import { ErrorMessage } from '../../components/ErrorMessage';
import './Watch.scss';
import { VideoPlayer } from './VideoPlayer';
import WatchPanel from './WatchPanel';
import { WatchProps } from '../../../utils/types';

export function Watch({
  setTranslate,
  menuContainer,
  isDarkMode,
  translate,
  discs,
  setDiscs,
  handleErrorMessage,
  setSavedVideos,
  setIsDarkMode,
  isErrorMessage,
  errorMessage,
  watchTitle,
  setWatchTitle,
  poster,
  savedVideosDetails,
  setSavedVideosDetails,
  setPoster,
  layout
}: WatchProps) {
  return (
    <>
      {
        isErrorMessage &&
        <ErrorMessage errorMessage={errorMessage} />
      }
      <SavedVideosHeader
        discTitle={watchTitle}
        setTranslate={setTranslate}
        menuContainer={menuContainer}
        isDarkMode={isDarkMode}
      />

      <div className="player-videos-container">
        <VideoPlayer poster={poster} />

        <WatchPanel
          savedVideosDetails={savedVideosDetails}
          setSavedVideosDetails={setSavedVideosDetails}
          setSavedVideos={setSavedVideos}
          handleErrorMessage={handleErrorMessage}
          setPoster={setPoster}
          layout={layout}
        />
      </div>

      <SidePanel
        translate={translate}
        setTranslate={setTranslate}
        menuContainer={menuContainer}
        discs={discs}
        setDiscs={setDiscs}
        handleErrorMessage={handleErrorMessage}
        setSavedVideos={setSavedVideos}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setWatchTitle={setWatchTitle}
      />
    </>
  );
}