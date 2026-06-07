import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { handleDuration, handleViewCount, youtubeTimeAgo } from '../../../utils/formatting';
import './SavedVideosGrid.scss';
import SavedVideoControls from './SavedVideoControls';
import { useRef, useState } from 'react';
import DiscsControls from './DiscsControls';
import { DiscType, SavedVideosGridProps } from '../../types/types';
import SubDisc from '../../components/SubDisc';
import API from '../../api/axios';
import NewSubDisc from '../../components/NewSubDisc';

export function SavedVideosGrid({
  savedVideosDetails,
  setSavedVideosDetails,
  handleErrorMessage,
  setPoster,
  layout,
  videos,
  setVideos,
  subDiscs,
  setSubDiscs
}: SavedVideosGridProps) {
  const [openControls, setOpenControls] = useState<number | null>(null);
  const [openDiscs, setOpenDiscs] = useState<number | null>(null);
  const [isAddSubdisc, setIsAddSubdisc] = useState<boolean>(false);
  const navigate = useNavigate();
  const controlsBtnRef = useRef<SVGSVGElement | null>(null);
  const discsRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();
  const discId = useParams().id;
  const videoId = useRef<string>('');

  return (
    <section className={`saved-videos-grid ${layout === 'watch-panel' && "watch-panel-videos"}`}>
      {
        layout === 'saved-videos' &&
        <header>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            onClick={() => setIsAddSubdisc(true)}
          >
            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
          </svg>
        </header>
      }
      {
        isAddSubdisc &&
        <NewSubDisc
          setIsAddSubdisc={setIsAddSubdisc}
          setSubDiscs={setSubDiscs}
          handleErrorMessage={handleErrorMessage}
        />
      }

      {
        (savedVideosDetails && savedVideosDetails.length)
          ? <section className="videos-container">
            <h3>Videos</h3>
            {
              savedVideosDetails.map((item, index) => {
                const videoThumbnail = item.snippet.thumbnails.maxres?.url ||
                  item.snippet.thumbnails.standard?.url ||
                  item.snippet.thumbnails.high?.url ||
                  item.snippet.thumbnails.medium?.url ||
                  item.snippet.thumbnails.default?.url;
                return (
                  <div draggable onDrag={() => videoId.current = item.id} className={(searchParams.get('v') && searchParams.get('v') === item.id) ? "saved-video video-playing" : "saved-video"} key={item.id}>
                    {
                      layout === 'saved-videos' &&
                      <div className="dragging-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                          <path d="M128 352C110.3 352 96 366.3 96 384C96 401.7 110.3 416 128 416L512 416C529.7 416 544 401.7 544 384C544 366.3 529.7 352 512 352L128 352zM128 224C110.3 224 96 238.3 96 256C96 273.7 110.3 288 128 288L512 288C529.7 288 544 273.7 544 256C544 238.3 529.7 224 512 224L128 224z" />
                        </svg>
                      </div>
                    }
                    <div
                      className="saved-video-details"
                      onClick={() => {
                        navigate(`/watch?v=${item.id}&discId=${discId || searchParams.get('discId')}`);
                        setPoster(videoThumbnail);
                      }}
                    >
                      <div className="saved-video-thumbnail-container">
                        <img
                          src={videoThumbnail || "default-thumbnail"}
                          alt=""
                          className="saved-video-thumbnail"
                        />
                        <div className="saved-video-duration">{handleDuration(item.contentDetails.duration)}</div>
                      </div>
                      <div className="saved-video-info">
                        <h3 className="saved-video-title">{item.snippet.title}</h3>
                        <h4 className="saved-video-statistics">
                          <span>{item.snippet.channelTitle}</span>
                          {
                            layout === 'saved-videos' &&
                            <>
                              <span> &#8226; {handleViewCount(item.statistics.viewCount)} &#8226; </span>
                              <span>{youtubeTimeAgo(item.snippet.publishedAt)}</span>
                            </>
                          }
                        </h4>
                      </div>
                    </div>
                    <div className="saved-video-controls-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        ref={controlsBtnRef}
                        viewBox="0 0 640 640"
                        className="three-dots-saved-video"
                        onClick={e => {
                          openControls === index ? setOpenControls(null) : setOpenControls(index);
                          controlsBtnRef.current = e.currentTarget;
                        }}
                      >
                        <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
                      </svg>
                      {
                        openControls === index &&
                        <SavedVideoControls
                          setOpenControls={setOpenControls}
                          controlsBtnRef={controlsBtnRef}
                          savedVideosDetails={savedVideosDetails}
                          setSavedVideosDetails={setSavedVideosDetails}
                          targetIndex={index}
                          setOpenDiscs={setOpenDiscs}
                          discsRef={discsRef}
                          handleErrorMessage={handleErrorMessage}
                          videos={videos}
                          setVideos={setVideos}
                          url={`${import.meta.env.VITE_FRONTEND_URL}/watch?v=${item.id}`}
                        />
                      }

                      {
                        openDiscs === index &&
                        <DiscsControls
                          discsRef={discsRef}
                          videoId={item.id}
                          setOpenControls={setOpenControls}
                          setOpenDiscs={setOpenDiscs}
                          handleErrorMessage={handleErrorMessage}
                        />
                      }
                    </div>
                  </div>
                );
              })
            }
          </section>
          : null
      }

      {
        (subDiscs && subDiscs.length)
          ? <section className="subdiscs-container">
            {layout === 'saved-videos' && <h3>Subdiscs</h3>}

            {
              subDiscs.map(subDisc => {
                return (
                  <SubDisc
                    title={subDisc.name}
                    key={subDisc._id}
                    videosCount={subDisc.videos.length}
                    id={subDisc._id}
                    latestVideo={subDisc.videos[0]}
                    draggable
                    onDragOver={e => {
                      e.preventDefault();
                    }}
                    onDrop={async () => {
                      const isVideo = subDisc.videos.find(item => item === videoId.current);

                      if (!isVideo) {
                        if (videoId.current) {
                          setSavedVideosDetails(
                            prev => {
                              if (prev) return prev.filter(item => item.id !== videoId.current);
                            }
                          );

                          const updatedVideos: string[] = videos.filter(item => item !== videoId.current);
                          setVideos(prev => prev.filter(item => item !== videoId.current));

                          await API.put(`/discs/update/${discId}`, {
                            videos: updatedVideos
                          });

                          await API.put(`/discs/update/${subDisc._id}`, {
                            videos: [videoId.current, ...subDisc.videos]
                          });


                          const updatedSubDiscs: DiscType[] = subDiscs.map(item => {
                            if (item._id === subDisc._id) {
                              item.videos = [videoId.current, ...subDisc.videos];
                              return item;
                            }

                            return item;
                          });

                          setSubDiscs(updatedSubDiscs);
                        }

                      } else {
                        handleErrorMessage('Video already exists in this subdisc.');
                      }

                      videoId.current = '';
                    }}
                  />
                );
              })
            }
          </section>
          : null
      }

    </section>
  );
}