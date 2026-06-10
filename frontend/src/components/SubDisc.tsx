import { useNavigate } from 'react-router-dom';
import { SubDiscProps, VideoResponse } from '../types/types';
import './SubDisc.scss';
import { useEffect, useRef, useState } from 'react';
import API from '../api/axios';
import SubDiscControls from './SubDiscControls';
import NewSubDisc from './NewSubDisc';

export default function SubDisc({
  title,
  videosCount,
  setSubDiscs,
  id,
  latestVideo,
  handleErrorMessage,
  ...rest
}: SubDiscProps) {
  const navigator = useNavigate();
  const [ thumbnail, setThumbnail ] = useState<string>('');
  const [ isControls, setIsControls ] = useState<boolean>(false);
  const controlsBtnRef = useRef<HTMLDivElement>(null);
  const [ isEditSubdisc, setIsEditSubdisc ] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (latestVideo) {
          const video = await API.get<VideoResponse>(`/youtube/videos/${latestVideo}`);
  
          setThumbnail(
            video.data.video.items[0].snippet.thumbnails.maxres?.url ||
            video.data.video.items[0].snippet.thumbnails.high?.url ||
            video.data.video.items[0].snippet.thumbnails.standard?.url ||
            video.data.video.items[0].snippet.thumbnails.medium?.url ||
            video.data.video.items[0].snippet.thumbnails.default?.url
          );
        }
        
      } catch (error) {
        console.log('Something went wrong when trying to connect to the server');
      }
    }

    fetchVideo();
  }, [videosCount]);

  return (
    <div 
      className="subdisc"
      {...rest}
    >
      {
        isEditSubdisc &&
        <NewSubDisc 
          setSubDiscs={setSubDiscs}
          type="edit"
          subdiscId={id}
          handleErrorMessage={handleErrorMessage}
          setIsEditSubdisc={setIsEditSubdisc}
          currentName={title}
        />
      }
      <div className="dragging-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
          <path d="M128 352C110.3 352 96 366.3 96 384C96 401.7 110.3 416 128 416L512 416C529.7 416 544 401.7 544 384C544 366.3 529.7 352 512 352L128 352zM128 224C110.3 224 96 238.3 96 256C96 273.7 110.3 288 128 288L512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224L128 224z"/>
        </svg>
      </div>

      <div className="subdisc-details-container" onClick={() => navigator(`/disc/${id}`)}>
        <div className="subdisc-thumbnail-container">
          <div aria-hidden="true"></div>
          <img src={thumbnail ? thumbnail : "/default-thumbnail.png"} alt="subdisc thumbnail" />
        </div>
        <div className="details-container">
          <h3>{title}</h3>
          <p>{videosCount} &#8226; {videosCount === 1 ? "Video" : "Videos"}</p>
        </div>
      </div>

      <div className="subdisc-control-btn" ref={controlsBtnRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          onClick={() => setIsControls(!isControls)}
        >
          <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
        </svg>

        {
          isControls &&
          <SubDiscControls 
            setIsControls={setIsControls}
            controlsBtnRef={controlsBtnRef}
            subdiscId={id}
            setSubDiscs={setSubDiscs}
            setIsEditSubdisc={setIsEditSubdisc}
          />
        }
      </div>
    </div>
  );
}