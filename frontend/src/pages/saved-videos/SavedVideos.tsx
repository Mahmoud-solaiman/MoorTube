import './SavedVideos.scss';
import { SavedVideosHeader } from './SavedVideosHeader';
import { SavedVideosPanel } from './SavedVideosPanel';
import { Activity, useEffect, useRef, useState } from 'react';
import { SavedVideosGrid } from './SavedVideosGrid';
import { SidePanel } from '../../components/SidePanel';
import { ErrorMessage } from '../../components/ErrorMessage';
import { DiscType, SavedVideosDetailsResponse, SavedVideosProps, SubDiscsResponse } from '../../types/types';
import API from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [ subDiscs, setSubDiscs ] = useState<DiscType[]>([]);
  const id = useParams().id;
  const navigator = useNavigate();

  useEffect(() => {
    try {
      const fetchDiscData = async () => {
        setIsSpinner(true);
        const videos = await API.get<SavedVideosDetailsResponse>(`/discs/${id}`);
        setSavedVideosDetails(videos.data.videos.items);
        setDiscName(videos.data.disc.name);
        setVideos(videos.data.disc.videos);

        const subDiscs = await API.get<SubDiscsResponse>(`/discs/subdiscs/${id}`);

        setSubDiscs(subDiscs.data.discs);
        setIsSpinner(false);
        document.title = `MoorTube | Disc | ${videos.data.disc.name}`;
      }
      fetchDiscData();
      
    } catch (error: any) {
      const errorMessage = error.response?.data.message || "Server error. Please, try again later!";
      handleErrorMessage(errorMessage);
    }

    setTranslate(false);

  }, [id]);

  useEffect(() => {
    const navigateToHome = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigator('/home');
      }
    }

    document.addEventListener('keyup', navigateToHome);

    return () => document.removeEventListener('keyup', navigateToHome);
  }, []);
  
  return (
    <div className="saved-videos-container">
      {
        isErrorMessage &&
        <ErrorMessage errorMessage={errorMessage}/>
      }
      <SavedVideosHeader
        setTranslate={setTranslate} 
        menuContainer={menuContainer}
      />

      {
        isSpinner 
        ? <Spinner />
        : <div className={((savedVideosDetails && savedVideosDetails.length) || (subDiscs && subDiscs.length)) ? "saved-videos" : "saved-videos empty"}>
          {
            ((savedVideosDetails && savedVideosDetails.length) || (subDiscs && subDiscs.length)) ? 
              <>
                <SavedVideosPanel
                  discName={discName}
                  savedVideosDetails={savedVideosDetails} 
                  setPoster={setPoster}
                  subDiscs={subDiscs}
                />

                <SavedVideosGrid 
                  savedVideosDetails={savedVideosDetails} 
                  setSavedVideosDetails={setSavedVideosDetails}
                  handleErrorMessage={handleErrorMessage}
                  setPoster={setPoster}
                  layout="saved-videos"
                  videos={videos}
                  setVideos={setVideos}
                  subDiscs={subDiscs}
                  setSubDiscs={setSubDiscs}
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