import './DeleteDisc.scss'; // Import the style sheet of this component

export function DeleteDisc({ setDiscs, setShowDelete, deleteConfirmationRef, discId}) {
  //Handle deleting a disc functionality
  function deleteDisc() {
    const updatedDiscs = JSON.parse(localStorage.getItem('current-discs')).filter(item => item.id !== discId);
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
            onTransitionEnd={e => e.stopPropagation()}
            onPointerUp={(e) => {
              deleteDisc()
              deleteConfirmationRef.current = e.target.parentElement; 
            }}
          >YES</button>
          <button 
            className="no-btn"
            onTransitionEnd={e => e.stopPropagation()}
            onPointerUp={(e) => {
              setShowDelete(false);
              deleteConfirmationRef.current = e.target.parentElement;
            }}
          >NO</button>
        </div>
      </div>
    </div>
  );
}