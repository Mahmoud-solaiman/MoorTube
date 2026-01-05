import axios from 'axios';
import './SavedVideos.scss';
import { SavedVideosHeader } from './SavedVideosHeader';
import { SavedVideosPanel } from './SavedVideosPanel';
import { useEffect, useState } from 'react';
import { SavedVideosGrid } from './savedVideosGrid';

export function SavedVideos({ savedVideos, api_key }) {
  const [ savedVideosDetails, setSavedVideosDetails ] = useState([]);

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
  }, [api_key, savedVideos]);

  return (
    <div className='saved-videos-container'>
      <SavedVideosHeader discTitle={savedVideos.name} />

      <div className="saved-videos">
        <SavedVideosPanel savedVideos={savedVideos} video={savedVideosDetails[savedVideosDetails.length - 1]} />

        <SavedVideosGrid savedVideosDetails={savedVideosDetails} />
      </div>
    </div>
  );
}