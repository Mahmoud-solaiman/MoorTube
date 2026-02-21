import './DiscsActions.scss'; // Import the style sheet of this component

export function DiscsActions({ 
    discsContainerRef, 
    videoId,
    handleErrorMessage,
    setOpenDisc,
    setOpenIndex,
    isOpenTop,
    setDiscs
  }) {
  const discs = JSON.parse(localStorage.getItem('current-discs')) || []; // Pull the current discs from local storage

  // This function saves the video into one of the existent discs so that it could be accessed later in the saved videos page
  function saveVideo(videos) {
    const isVideo = videos.find(item => item === videoId); // Check if the video exists or not in this disc
    
    if (!isVideo) { // If disc doesn't exists
      videos.unshift(videoId); // Add the video id to this disc
      setDiscs(discs);
      handleErrorMessage("Added successfully!"); // And show that the video has been added successfully
      
    } else { // If the video exists though
      handleErrorMessage("Video already exists in this discs."); // Tell the user that the video does exist in this disc
    }

    // Then update the local storage
    localStorage.setItem('current-discs', JSON.stringify(discs));

    setOpenDisc(undefined); // Hide the DiscsActions component
    setOpenIndex(undefined); // And hide the Actions component
  }

  // The JSX of the DiscsActions component
  return (
    <div 
      style={!discs.length ? {textAlign: 'center'} : undefined}
      className={isOpenTop ? 'discs-actions-container open-top' : 'discs-actions-container'} 
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
              key={item.id} 
              className='disc-actions'
              onPointerUp={e => {
                e.stopPropagation();
                discsContainerRef.current = e.target.parentElement;
                saveVideo(item.items);
              }}
            >{item.name.length > 18 ? `${item.name.slice(0, 18).trimEnd()}...`: item.name}</div>
          )
        }) :
        "You have no discs to show!"
      }
    </div>
  );
}