import { useRef } from 'react';
import type { DiscDeleteProps, SingleDiscResponse } from '../types/types';
import './DeleteDisc.scss'; // Import the style sheet of this component
import API from '../api/axios';

export function DeleteDisc({ 
    setDiscs, 
    setShowDelete, 
    deleteConfirmationRef, 
    discId,
    discs
  }: DiscDeleteProps) {

    const deletePopUpRef = useRef<HTMLDivElement | null>(null); 
    //Handle deleting a disc functionality
    async function deleteDisc() {
      try {
        const deletedDisc: SingleDiscResponse = await API.delete(`/discs/delete/${discId}`);
        const newDiscs = discs.filter(disc => disc._id !== deletedDisc.data.disc._id);
        setDiscs(newDiscs);
        
      } catch (error: any) {
        console.error(error.response?.data?.message);
      }
    }

    function hideDeleteMessage(e: React.PointerEvent) {
      const target = e.target as Node;

      if (!deletePopUpRef.current?.contains(target)) {
        setShowDelete(false);
        deleteConfirmationRef.current = e.currentTarget as HTMLElement;
      }
    }

  // The JSX of the DeleteDisc component
  return (
    <div className="delete-popup-container" onPointerUp={hideDeleteMessage}>
      <div className="delete-popup" ref={deletePopUpRef}>
        <div className="delete-question">
          Are you sure you want to delete this disc?
        </div>
        <div className="delete-actions-container">
          <button 
            className="yes-btn"
            type="button"
            onPointerUp={(e) => {
              deleteDisc();
              deleteConfirmationRef.current = e.currentTarget.parentElement ; 
            }}
          >YES</button>
          <button 
            className="no-btn"
            type="button"
            onPointerUp={(e) => {
              setShowDelete(false);
              deleteConfirmationRef.current = e.currentTarget.parentElement;
            }}
          >NO</button>
        </div>
      </div>
    </div>
  );
}