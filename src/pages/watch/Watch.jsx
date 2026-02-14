import { SavedVideosHeader } from '../saved-videos/SavedVideosHeader';
import { SidePanel } from '../../components/SidePanel';
import { ErrorMessage } from '../../components/ErrorMessage';
import './Watch.scss';
import { VideoPlayer } from './VideoPlayer';

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
  videoPlayerSrc,
  watchTitle,
  setWatchTitle
}) {
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
        <VideoPlayer videoPlayerSrc={videoPlayerSrc} />
      </div>

      {
        (translate || translate === 0) &&
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
      }
    </>
  );
}