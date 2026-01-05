import { useState } from 'react'; // Import useState from the React package
import { DeleteDisc } from './DeleteDisc'; // Import the DeleteDisc component
import './Disc.scss'; // Import the style sheet of this compoenent
import { Link } from 'react-router-dom';

export function Disc({
  disc,
  title,
  discId,
  setDiscs,
  deleteConfirmationRef,
  handleErrorMessage,
  setSavedVideos,
  discObject
}) {
  //Functions and Variables ==> Javascript + React
  // Hooks
  const [showDelete, setShowDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [discName, setDiscName] = useState(title);

  // The function that handles editing the desired disc
  function editDisc() {
    const currentDiscs = JSON.parse(localStorage.getItem('current-discs')); // Pull the current discs from local storage
    const discToEdit = currentDiscs.find(item => item.id === discId); // Locate the disc that the user wants to edit by using the disc Id
    const isDisc = currentDiscs.find(item => item.name.toLowerCase() === discName.trim().toLowerCase()); // Check if the new edited disc already exists

    if ((!isDisc || isDisc.id === discToEdit.id) && discName.trim().length >= 5) { // If the new disc doesn't exist or if the user wants to withdraw the editing action
      discToEdit.name = discName.trim(); // Update the disc name
      localStorage.setItem('current-discs', JSON.stringify(currentDiscs)); // Update the local storage
      setDiscs(currentDiscs); // Update the discs in the SidePanel
      setIsEdit(false); // Hide the editing field

    } if (isDisc && isDisc.id !== discToEdit.id) { // If disc does exist and it's not the current disc
      setIsEdit(true); // Keep the edit field
      handleErrorMessage('Disc already exists! Please try a different name.'); // Show this error message to tell the user that the disc already exists 

    } if (!discName.trim()) { // If the new disc value is empty
      setIsEdit(true); // Keep the edit field
      handleErrorMessage("Disc name can't be an empty value."); // Tell the user that the disc name can't be an empty value
    } if (discName.trim() && discName.trim().length < 5) {
      handleErrorMessage("Disc name should at least be 5 characters.");
    }

  }

  //JSX code
  return (
    <div className='disc'>
      {isEdit &&
        <input
          type="text"
          id="edit-disc-name"
          autoFocus
          name="edit"
          value={discName}
          onChange={(e) => setDiscName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              editDisc();
            }

          }}
        />
      }
      <Link 
        to="savedVideos" 
        className='disc-name'
        title={title}
        style={isEdit ? { display: 'none' } : null}
        onPointerDown={() => setSavedVideos(discObject)}
      >
        {disc}
      </Link>
      <div className='disc-controls-container'>
        <svg
          xmlns={isEdit ? "../assets/checkmark.svg" : "../assets/pen.svg"}
          viewBox="0 0 640 640"
          className='edit-btn'
          onTransitionEnd={e => e.stopPropagation()}
          onPointerUp={() => {
            setIsEdit(!isEdit);
            if (isEdit) {
              editDisc();
            }
          }}
        >
          {
            isEdit ?
              <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" /> :
              <path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" />
          }

        </svg>
        <svg
          xmlns="../assets/trash-can.svg"
          viewBox="0 0 640 640"
          onPointerUp={() => setShowDelete(true)}
          onTransitionEnd={e => e.stopPropagation()}
          className='delete-btn'
        >
          <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
        </svg>
      </div>

      {
        showDelete &&
        <DeleteDisc
          setDiscs={setDiscs}
          setShowDelete={setShowDelete}
          deleteConfirmationRef={deleteConfirmationRef}
          discId={discId}
        />}
    </div>
  );
}