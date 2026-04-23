import axios from 'axios';
import './SavedVideos.scss';
import { SavedVideosHeader } from './SavedVideosHeader';
import { SavedVideosPanel } from './SavedVideosPanel';
import { useEffect, useRef, useState } from 'react';
import { SavedVideosGrid } from './SavedVideosGrid';
import { SidePanel } from '../../components/SidePanel';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SavedVideosDetails, SavedVideosProps } from '../../../utils/types';

export function SavedVideos({
  savedVideos,
  api_key,
  setTranslate,
  translate,
  discs,
  setDiscs,
  handleErrorMessage,
  setSavedVideos,
  isDarkMode,
  setIsDarkMode,
  errorMessage,
  isErrorMessage,
  setWatchTitle,
  setPoster,
  savedVideosDetails,
  setSavedVideosDetails
}: SavedVideosProps) {
  
  const menuContainer = useRef(null);

  useEffect(() => {
    const fetchSavedVideos = async () => {
      const savedVideosRequest = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: "snippet,contentDetails,statistics",
          key: api_key,
          id: savedVideos.items.map(item => item).join(',')
        }
      });

      setSavedVideosDetails(savedVideosRequest.data.items);
    }

    fetchSavedVideos();
    setTranslate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedVideos]);
  
  return (
    <div className="saved-videos-container">
      {
        isErrorMessage &&
        <ErrorMessage errorMessage={errorMessage}/>
      }
      <SavedVideosHeader 
        discTitle={savedVideos.name} 
        setTranslate={setTranslate} 
        menuContainer={menuContainer}
        isDarkMode={isDarkMode}
      />

      <div className={savedVideos.items.length ? "saved-videos" : "saved-videos empty"}>
        {
          savedVideos.items.length ? 
            <>
              <SavedVideosPanel 
                savedVideos={savedVideos} 
                savedVideosDetails={savedVideosDetails} 
                setPoster={setPoster}
              />

              <SavedVideosGrid 
                savedVideosDetails={savedVideosDetails} 
                setSavedVideosDetails={setSavedVideosDetails}
                setSavedVideos={setSavedVideos}
                handleErrorMessage={handleErrorMessage}
                setPoster={setPoster}
                layout="saved-videos"
                setDiscs={setDiscs}
              />
            </> :
            "Seems like you haven't added any videos to this Disc!"
        }
        
      </div>
      {
        translate &&
        <SidePanel
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

    </div>
  );
}