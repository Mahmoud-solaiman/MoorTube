import type { DiscDeleteProps, DiscType } from '../../utils/types';
import './DeleteDisc.scss'; // Import the style sheet of this component

export function DeleteDisc({ 
    setDiscs, 
    setShowDelete, 
    deleteConfirmationRef, 
    discId
  }: DiscDeleteProps) {
  //Handle deleting a disc functionality
  function deleteDisc() {
    const currentDiscsStorage = localStorage.getItem('current-discs');
    const updatedDiscs: DiscType[] = currentDiscsStorage && JSON.parse(currentDiscsStorage).filter((item: DiscType) => item.id !== discId);
    setDiscs(updatedDiscs);
    localStorage.setItem('current-discs', JSON.stringify(updatedDiscs));
  }

  // The JSX of the DeleteDisc component
  return (
    <div className='delete-popup-container'>
      <div className="delete-popup">
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