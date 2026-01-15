import axios from 'axios';
import './SavedVideos.scss';
import { SavedVideosHeader } from './SavedVideosHeader';
import { SavedVideosPanel } from './SavedVideosPanel';
import { useEffect, useRef, useState } from 'react';
import { SavedVideosGrid } from './SavedVideosGrid';
import { SidePanel } from '../../components/SidePanel';

export function SavedVideos({
  savedVideos,
  api_key,
  setTranslate,
  translate,
  discs,
  setDiscs,
  handleErrorMessage,
  setSavedVideos
}) {
  const [ savedVideosDetails, setSavedVideosDetails ] = useState([]);
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
    <div className='saved-videos-container'>
      <SavedVideosHeader discTitle={savedVideos.name} setTranslate={setTranslate} menuContainer={menuContainer}/>

      <div className="saved-videos">
        <SavedVideosPanel savedVideos={savedVideos} video={savedVideosDetails[0]} />

        <SavedVideosGrid savedVideosDetails={savedVideosDetails} />
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
        />
      }

    </div>
  );
}