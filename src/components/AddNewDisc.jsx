import { useState } from 'react'; // Importing the useState hook from the react package
import { generateID } from '../../utils/formatting';
import './AddNewDisc.scss'; // Importing the sass styles for this component

export function AddNewDisc({
  newAdderContainerRef, // The reference of the new disc adder used at the function used to hide the actions, discs, and the new disc adder
  setDiscs, // The setDiscs state is used to update the current discs in our discs list
  setOpenIndex, // This state is used to control which Actions component to show
  setOpenNewAdder, // This state is used to control which AddNewDisc component to show
  setTranslate, // This is used to toggle the SidePanel
  handleErrorMessage, // This function handles the error messages
  videoId, // This is the video Id of each video in the list of videos fetched from the API used when pushing a new disc
  isOpenTop // This is the variable used to determine the position of the Actions component and its sibling components
}) {
  //Variables and hooks
  const [newDiscValue, setNewDiscValue] = useState('');

  //Function that handles adding a new disc
  function addDisc() {
    const newDiscValueTrimmed = newDiscValue.trim(); // Setting the new disc value
    const currentDiscs = JSON.parse(localStorage.getItem('current-discs')) || []; // Pulling the current discs from the local storage
    const isDisc = currentDiscs.find(item => item.name.toLowerCase() === newDiscValueTrimmed.toLowerCase()); // Looking for any identical discs in the current discs

    if (!isDisc && newDiscValueTrimmed.length >= 5) { // If disc doesn't exist and the new disc value isn't an empty value
      // Push the new disc to the current discs
      currentDiscs.push({
        name: newDiscValueTrimmed,
        id: generateID(),
        items: []
      });

      // Push the video Id to the items array for the new disc
      currentDiscs[currentDiscs.length - 1].items.push(videoId);

      // Then update the local storage with the latest version of the discs
      localStorage.setItem('current-discs', JSON.stringify(currentDiscs));
      setDiscs(currentDiscs); // Update the discs the render the latest version of the discs
      setOpenIndex(null); // Hide the Actions component
      setOpenNewAdder(null); // Hide the AddnewDisc compoenent
      setTranslate(true); // Show the SidePanel
      handleErrorMessage('Added successfully!'); // Show a message that the video has been added successfully

    } else if (isDisc) { // If the new disc alreay exists
      handleErrorMessage('Disc already exists! Please try a different name.'); // Error message that tells the user that disc already exists

    } else if (!newDiscValueTrimmed) { // If the new disc is an empty value
      handleErrorMessage("Disc name can't be an empty value."); // Error message that tells the user that the disc can't be an empty value
    } else if (newDiscValueTrimmed.length && newDiscValueTrimmed.length < 5) {
      handleErrorMessage("Disc name should at least be 5 characters");
    }
  }

  // The JSX of the AddNewDisc component
  return (
    <div 
      className={isOpenTop ? "new-disc-adder open-top" : "new-disc-adder"} 
      onPointerDown={e => {
        newAdderContainerRef.current = e.currentTarget;
      }}
      onPointerUp={e => e.stopPropagation()}
    >
      <input
        autoComplete="off"
        autoFocus
        type="text"
        name="new-disc-adder"
        id="new-disc-adder-input"
        placeholder="Enter new disc"
        value={newDiscValue}
        onChange={e => setNewDiscValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            addDisc();
          }
        }}
      />
      <div className="new-disc-adder-btns-container">
        <button
          className="cancel-new-disc-btn"
          onPointerUp={() => {
            setOpenNewAdder(null);
          }}
        >Cancel</button>
        <button
          className="add-new-disc-btn"
          onClick={addDisc}
        >Add</button>
      </div>
    </div>
  );
}