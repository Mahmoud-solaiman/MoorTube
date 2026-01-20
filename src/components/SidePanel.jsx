import { useEffect, useRef, useState } from 'react'; // Import these hooks from the React package
import { Disc } from './Disc'; // Import the Disc component
import './SidePanel.scss'; // Import the style sheet of this component

export function SidePanel({ 
    translate, 
    setTranslate, 
    menuContainer,
    discs, 
    setDiscs,
    handleErrorMessage,
    setSavedVideos
  }) {
  //Javascript and React functions and variables
  const [ discFieldValue, setDiscFieldValue ] = useState('');
  const sidePanel = useRef(null);
  const deleteConfirmationRef = useRef(null);
  const addDiscField = useRef(null);

  //The function that handles adding a new disc to the current discs
  const addDisc = (value) => {
    const discValueTrimmed = value.trim(); // Set the new disc value
    const currentDiscs = JSON.parse(localStorage.getItem('current-discs')) || []; // Pull the current discs from local storage

    const discExists = currentDiscs.find(item => item.name.toLowerCase() === discValueTrimmed.toLowerCase()); // Check if the new disc already exists
    
    if (!discExists && discValueTrimmed.length >= 5) { // If new disc doesn't exist and the disc name isn't an empty value
      // Push the new disc to the current discs
      currentDiscs.push({
        name: discValueTrimmed,
        id: crypto.randomUUID(),
        items: []
      });

      // Update local storage
      localStorage.setItem('current-discs', JSON.stringify(currentDiscs));
      setDiscs(currentDiscs); // Update the current discs
      setDiscFieldValue(''); // Reset the field value

    } if (discExists) { // If the disc exists though
      handleErrorMessage('Disc already exists! Please, try a different name.'); // Tell user to try a different name
      setDiscFieldValue(value); // Don't reset the field value

    } if (!discValueTrimmed) { // If the new disc value is empty
      handleErrorMessage("Disc name can't be an empty value."); // Tell user that disc name can't be an empty value
      setDiscFieldValue(value); // Don't reset the field value
    
    } if (discValueTrimmed && discFieldValue.length < 5) { // If new disc is less than 5 characters long
      handleErrorMessage("Disc name should at least be 5 characters"); // Tell user that disc name can't be less than 5 characters
      setDiscFieldValue(value); // Don't reset the field value
    }
  }

  //The function that handles hidding the side panel when clicking outside of it;
  useEffect(() => {
    function hideSidePanel(e) {
      if (!sidePanel.current) return;

      if (
        !sidePanel.current?.contains(e.target) &&
        !menuContainer.current.contains(e.target) &&
        !deleteConfirmationRef.current?.contains(e.target)
      ) {
        setTranslate(-104);
      }
    }

    document.addEventListener('pointerup', hideSidePanel);
  });


  //JSX elements and functions
  return (
    <aside
      className="side-panel"
      style={{ transform: `translateX(${translate}%)` }}
      ref={sidePanel}
      onTransitionEnd={() => setTranslate(false)}
    >
      <header className="side-panel-header">
        <div className="mode-toggle">
          <svg className='sun' xmlns="../assets/sun.svg" viewBox="0 0 640 640">
            <path d="M210.2 53.9C217.6 50.8 226 51.7 232.7 56.1L320.5 114.3L408.3 56.1C415 51.7 423.4 50.9 430.8 53.9C438.2 56.9 443.4 63.5 445 71.3L465.9 174.5L569.1 195.4C576.9 197 583.5 202.4 586.5 209.7C589.5 217 588.7 225.5 584.3 232.2L526.1 320L584.3 407.8C588.7 414.5 589.5 422.9 586.5 430.3C583.5 437.7 576.9 443.1 569.1 444.6L465.8 465.4L445 568.7C443.4 576.5 438 583.1 430.7 586.1C423.4 589.1 414.9 588.3 408.2 583.9L320.4 525.7L232.6 583.9C225.9 588.3 217.5 589.1 210.1 586.1C202.7 583.1 197.3 576.5 195.8 568.7L175 465.4L71.7 444.5C63.9 442.9 57.3 437.5 54.3 430.2C51.3 422.9 52.1 414.4 56.5 407.7L114.7 320L56.5 232.2C52.1 225.5 51.3 217.1 54.3 209.7C57.3 202.3 63.9 196.9 71.7 195.4L175 174.6L195.9 71.3C197.5 63.5 202.9 56.9 210.2 53.9zM239.6 320C239.6 275.6 275.6 239.6 320 239.6C364.4 239.6 400.4 275.6 400.4 320C400.4 364.4 364.4 400.4 320 400.4C275.6 400.4 239.6 364.4 239.6 320zM448.4 320C448.4 249.1 390.9 191.6 320 191.6C249.1 191.6 191.6 249.1 191.6 320C191.6 390.9 249.1 448.4 320 448.4C390.9 448.4 448.4 390.9 448.4 320z" />
          </svg>
          <span className="mode-label">Light Mode</span>
        </div>
        <div className="xmark" onTransitionEnd={e => e.stopPropagation()} onPointerUp={() => setTranslate(-104)}>
          <svg xmlns="xmark.svg" viewBox="0 0 640 640">
            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
          </svg>
        </div>
      </header>

      <div className="add-section">
        <input
          autoComplete="off"
          autoFocus
          type="text"
          name="add-disc"
          id="add-disc"
          ref={addDiscField}
          placeholder='Enter disc name'
          value={discFieldValue}
          onChange={(e) => setDiscFieldValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addDisc(discFieldValue);
            }
          }}
        />
        <svg
          xmlns="../assets/plus.svg"
          viewBox="0 0 640 640"
          onTransitionEnd={e => e.stopPropagation()}
          onPointerUp={() => {
            if (discFieldValue.trim()) {
              addDisc(discFieldValue);
            }
            
            addDiscField.current.focus();
          }}
        >
          <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
        </svg>
      </div>

      <div className="current-discs">
        <span className='current-discs-label'>Current Discs</span>
        <section className="current-discs-container">
          {
            discs.length ?
              discs.map(disc => {
                const finalDisc = disc.name.length > 25 ? `${disc.name.slice(0, 25).trimEnd()}...` : disc.name;
                return (
                  <Disc
                    disc={finalDisc}
                    title={disc.name}
                    discId={disc.id}
                    key={disc.id}
                    setDiscs={setDiscs}
                    deleteConfirmationRef={deleteConfirmationRef}
                    handleErrorMessage={handleErrorMessage}
                    setSavedVideos={setSavedVideos}
                    discObject={disc}
                  />
                )
              }) :
              'There is no discs yet.'
          }
        </section>
      </div>
    </aside>
  );
}