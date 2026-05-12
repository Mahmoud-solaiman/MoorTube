import { useEffect } from 'react';
import { DiscsActionsProps, DiscsResponse, DiscType, SingleDiscResponse } from '../types/types';
import './DiscsActions.scss'; // Import the style sheet of this component
import API from '../api/axios';

export function DiscsActions({
  discsContainerRef,
  videoId,
  handleErrorMessage,
  setOpenDisc,
  setOpenIndex,
  isOpenTop,
  setDiscs,
  discs
}: DiscsActionsProps) {

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const discs: DiscsResponse = await API.get('/discs');
        setDiscs(discs.data.discs);
      } catch (error) {
        console.error("Something went wrong when trying to connect to the server.");
      }
    }

    fetchDiscs();
  }, []);

  const addNewVideo = async (id: string, videos: string[]) => {
    try {
      const existingVideo = videos.find(video => video === videoId);
      if (existingVideo) {
        handleErrorMessage('Video already exists in this disc!');
      } else {
        const newDisc: SingleDiscResponse = await API.put(`/discs/update/${id}`, {
          videos: [videoId, ...videos]
        });

        handleErrorMessage('Video has been added successfully.');
      }

      setOpenDisc(null);
      setOpenIndex(undefined);
    } catch (error: any) {
      handleErrorMessage(error.response?.data?.message);
    }
  }

  // The JSX of the DiscsActions component
  return (
    <div
      className={isOpenTop ? (!discs.length ? 'discs-actions-container open-top empty' : 'discs-actions-container open-top') : (!discs.length ? 'discs-actions-container empty' : 'discs-actions-container')}
      onPointerDown={e => {
        if (!discs.length) {
          discsContainerRef.current = e.currentTarget;
        }
      }}
      onPointerUp={e => e.stopPropagation()}
    >
      {
        discs.length ?
          discs.map(item => {
            return (
              <div
                key={item._id}
                className='disc-actions'
                onPointerUp={e => {
                  e.stopPropagation();
                  discsContainerRef.current = e.currentTarget.parentElement;
                  addNewVideo(item._id, item.videos);
                }}
              >{item.name.length > 18 ? `${item.name.slice(0, 18).trimEnd()}...` : item.name}</div>
            )
          }) :
          "You have no discs to show!"
      }
    </div>
  );
}