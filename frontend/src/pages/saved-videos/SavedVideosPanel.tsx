import { useNavigate, useParams } from 'react-router-dom';
import './SavedVideosPanel.scss';
import { SavedVideosPanelProps, VideoResponse } from '../../types/types';
import { useRef, useEffect, useState } from 'react';
import API from '../../api/axios';

export function SavedVideosPanel({
  discName,
  savedVideosDetails,
  setPoster,
  subDiscs
}: SavedVideosPanelProps) {
  const navigate = useNavigate();
  const discId = useParams().id;
  const [ topSubDiscThumbnail, setTopSubDiscThumbnail] = useState<string>('');

  const highestResUrl = savedVideosDetails &&
    (
      savedVideosDetails[0]?.snippet.thumbnails.maxres?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.standard?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.high?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.medium?.url ||
      savedVideosDetails[0]?.snippet.thumbnails.default?.url
    );
  const sidePanel = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sidePanel.current) {
      sidePanel.current.style.setProperty('--bg-image', `url(${highestResUrl || topSubDiscThumbnail})`);
    }
  }, [highestResUrl, topSubDiscThumbnail, subDiscs]);

  useEffect(() => {
    const fetchTopSubDiscThumbnail = async () => {
      try {
        const video = await API.get<VideoResponse>(`/youtube/videos/${subDiscs[0].videos[0]}`);

        setTopSubDiscThumbnail(
          video.data.video.items[0].snippet.thumbnails.maxres?.url ||
          video.data.video.items[0].snippet.thumbnails.high?.url ||
          video.data.video.items[0].snippet.thumbnails.standard?.url ||
          video.data.video.items[0].snippet.thumbnails.medium?.url ||
          video.data.video.items[0].snippet.thumbnails.default?.url
        );
      } catch (error) {
        console.log('Something went wrong when trying to connect to the server');
      }
    }

    fetchTopSubDiscThumbnail();
  }, [topSubDiscThumbnail, subDiscs]);

  
  return (
    <aside
      ref={sidePanel}
      className="panel-outer"
    >
      <section className="panel-inner">
      {
        highestResUrl &&
        <div>
          <div className="top-video-container">
            <div
              className="top-video-navigator"
              aria-hidden="true"
              onClick={() => {
                navigate(`/watch?v=${savedVideosDetails && savedVideosDetails[0].id}&discId=${discId}`);
                setPoster(highestResUrl);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
              </svg>
              Play
            </div>
            <img
              src={highestResUrl}
              alt="Top video thumbnail"
              className="top-video-thumbnail"
            />
          </div>
          <div className="disc-details">
            <h2>{discName}</h2>
            <p>{savedVideosDetails && savedVideosDetails.length} &#8226; {savedVideosDetails && savedVideosDetails.length === 1 ? "video" : "videos"}</p>
          </div>
        </div>
      }
      {
        topSubDiscThumbnail &&
        <div>
          <div className="top-video-container top-subdisc-container">
            <div
              className="top-video-navigator"
              aria-hidden="true"
              onClick={() => {
                navigate(`/disc/${subDiscs[0]._id}`);
                setPoster(highestResUrl);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z" />
              </svg>
              Go
            </div>
            <img
              src={topSubDiscThumbnail}
              alt="Top video thumbnail"
              className="top-video-thumbnail"
            />
          </div>
          <div className="disc-details">
            <h2>{subDiscs[0].name}</h2>
            <p>{subDiscs[0].videos.length} &#8226; {subDiscs[0].videos && subDiscs[0].videos.length === 1 ? "video" : "videos"}</p>
          </div>
        </div>
      }
      </section>
    </aside>
  );
}