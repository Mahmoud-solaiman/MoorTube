import { useEffect, useState } from 'react';
import { DiscsControlsProps, DiscsResponse, DiscType, SingleDiscResponse } from '../../types/types';
import './DiscsControls.scss';
import API from '../../api/axios';
import { useParams, useSearchParams } from 'react-router-dom';

export default function DiscsControls({ 
    discsRef, 
    videoId, 
    setOpenControls, 
    setOpenDiscs,
    handleErrorMessage
  }: DiscsControlsProps) {
  const [ filteredDiscs, setFilteredDiscs ] = useState<DiscType[]>([]);
  const id = useParams().id;
  const [ searchParams ] = useSearchParams();

  async function addVideoToNewDisc(discId: string, videosList: string[]) {
    try {
      const isVideo = videosList.find(video => video === videoId);
      if (isVideo) {
        handleErrorMessage('Video already exists in this disc');
      } else {
        const updatedDisc: SingleDiscResponse = await API.put(`/discs/update/${discId}`, {
          videos: [videoId, ...videosList]
        }); 

        handleErrorMessage(updatedDisc.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong when trying to connect to the server";
      handleErrorMessage(errorMessage);      
    }
    setOpenControls(null);
    setOpenDiscs(null);
  }


  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const discsRes: DiscsResponse = await API.get('/discs');
        const newDiscs = discsRes.data.discs.filter(disc => (disc._id !== id && disc._id !== searchParams.get('discId')));
        setFilteredDiscs(newDiscs);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Something went wrong when trying to connect to the server";
        handleErrorMessage(errorMessage);
      }
    }

    fetchDiscs();
  }, []);
  return (
    <div className="discs-container" ref={discsRef}>
      {
        filteredDiscs.length 
          ? filteredDiscs.map(item => {
            return (
              <h3 
                title={item.name} 
                key={item._id}
                onClick={() => addVideoToNewDisc(item._id, item.videos)}
              >{item.name.length >= 18 ? `${item.name.slice(0, 17)}...` : item.name }</h3>
            );
          })
          : "You have no other discs!"
      }
    </div>
  );
}