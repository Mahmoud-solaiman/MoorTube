import './SavedVideos.scss';
import { SavedVideosHeader } from './SavedVideosHeader';
import { SavedVideosPanel } from './SavedVideosPanel';
import { Activity, useEffect, useRef, useState } from 'react';
import { SavedVideosGrid } from './SavedVideosGrid';
import { SidePanel } from '../../components/SidePanel';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SavedVideosDetailsResponse, SavedVideosProps } from '../../types/types';
import API from '../../api/axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner';

export function SavedVideos({
  setTranslate,
  translate,
  discs,
  setDiscs,
  handleErrorMessage,
  isDarkMode,
  setIsDarkMode,
  errorMessage,
  isErrorMessage,
  setWatchTitle,
  setPoster,
  savedVideosDetails,
  setSavedVideosDetails,
  videos,
  setVideos
}: SavedVideosProps) {
  
  const menuContainer = useRef(null);
  const [ discName, setDiscName ] = useState<string>('');
  const [ isSpinner, setIsSpinner ] = useState<boolean>(false);
  const id = useParams().id;

  useEffect(() => {
    try {
      const fetchSavedVideos = async () => {
        setIsSpinner(true);
        const videos = await API.get<SavedVideosDetailsResponse>(`/discs/${id}`);
        setSavedVideosDetails(videos.data.videos.items);
        setDiscName(videos.data.disc.name);
        setVideos(videos.data.disc.videos);
        setIsSpinner(false);
        document.title = `MoorTube | Disc | ${videos.data.disc.name}`;
      }
      fetchSavedVideos();
      
    } catch (error: any) {
      const errorMessage = error.response?.data.message || "Server error. Please, try again later!";
      handleErrorMessage(errorMessage);
    }

    setTranslate(false);

  }, [id]);
  
  return (
    <div className="saved-videos-container">
      {
        isErrorMessage &&
        <ErrorMessage errorMessage={errorMessage}/>
      }
      <SavedVideosHeader
        setTranslate={setTranslate} 
        menuContainer={menuContainer}
        isDarkMode={isDarkMode}
      />

      {
        isSpinner 
        ? <Spinner />
        : <div className={(savedVideosDetails && savedVideosDetails.length )? "saved-videos" : "saved-videos empty"}>
          {
            (savedVideosDetails && savedVideosDetails.length) ? 
              <>
                <SavedVideosPanel
                  discName={discName}
                  savedVideosDetails={savedVideosDetails} 
                  setPoster={setPoster}
                />

                <SavedVideosGrid 
                  savedVideosDetails={savedVideosDetails} 
                  setSavedVideosDetails={setSavedVideosDetails}
                  handleErrorMessage={handleErrorMessage}
                  setPoster={setPoster}
                  layout="saved-videos"
                  videos={videos}
                  setVideos={setVideos}
                />
              </> 
              : "This disc seems to have no videos."
          }  
        </div>
      }
            <Activity mode={translate ? "visible" : "hidden"}>
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
            </Activity>

    </div>
  );
}