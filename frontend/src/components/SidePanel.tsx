import { useEffect, useRef, useState } from 'react'; // Import these hooks from the React package
import { Disc } from './Disc'; // Import the Disc component
import './SidePanel.scss'; // Import the style sheet of this component
import type { DiscsResponse, SidePanelProps, SingleDiscResponse } from '../types/types';
import API from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import LoadingDiscs from './UI/LoadingDiscs';

export function SidePanel({
  setTranslate,
  menuContainer,
  discs,
  setDiscs,
  handleErrorMessage,
  isDarkMode,
  setIsDarkMode,
  setWatchTitle
}: SidePanelProps) {
  //Javascript and React functions and variables
  const [discFieldValue, setDiscFieldValue] = useState('');
  const sidePanel = useRef<HTMLElement | null>(null);
  const deleteConfirmationRef = useRef<HTMLElement | null>(null);
  const addDiscField = useRef<HTMLInputElement | null>(null);
  const [ username, setUsername ] = useState<string>('');
  const [ isCopied, setIsCopied ] = useState<boolean>(false);
  const [ isLoadingDiscs, setIsLoadingDiscs ] = useState<boolean>(false);

  //The function that handles adding a new disc to the current discs
  const addDisc = async (value: string) => {
    try {
      if (value.trim().length < 5) return handleErrorMessage('Disc name must at least be 5 characters.');
      const newDisc: SingleDiscResponse = await API.post('/discs/create', {
        name: value.trim()
      });
      discs ? setDiscs([...discs, newDisc.data.disc]) : setDiscs([newDisc.data.disc]);
      setDiscFieldValue('');
    } catch (error: any) {
      handleErrorMessage(error.response?.data?.message);
    }
  }

  //The function that handles hidding the side panel when clicking outside of it;
  useEffect(() => {
    function hideSidePanel(e: PointerEvent) {
      const target = e.target as Node;
      if (!sidePanel.current) return;

      if (
        !sidePanel.current?.contains(target) &&
        !menuContainer.current?.contains(target) &&
        !deleteConfirmationRef.current?.contains(target)
      ) {
        setTranslate(false);
      }
    }

    document.addEventListener('pointerup', hideSidePanel);

    return () => document.removeEventListener('pointerup', hideSidePanel);
  }, [menuContainer, setDiscs, setTranslate]);

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        setIsLoadingDiscs(true);
        const discs: DiscsResponse = await API.get('/discs');
        setDiscs(discs.data.discs);
        setIsLoadingDiscs(false);
        
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Something went wrong when trying to connect to the server";
        handleErrorMessage(errorMessage);
        setIsLoadingDiscs(false);
      }
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as {username: string;};
      setUsername(decodedToken.username);

    }

    fetchDiscs();
  }, []);

  useEffect(() => {
    const focusInput = (e: KeyboardEvent) => {
      if (e.key === '/') addDiscField.current?.focus();
    }

    document.addEventListener('keyup', focusInput);

    return () => document.removeEventListener('keyup', focusInput);
  }, []);

  // The function that handles toggling the mode between light and dark
  function toggleMode() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('mode-preference', JSON.stringify(!isDarkMode));
  }

  //JSX elements and functions
  return (
    <aside
      className="side-panel"
      ref={sidePanel}
      onKeyUp={e => {
        if (e.key === 'Enter') {
          addDiscField.current?.focus();
        }
      }}
    >
      <header className="side-panel-header">
        <div className="mode-toggle">
          {
            !isDarkMode &&
            <svg
              onClick={toggleMode}
              xmlns="http://www.w3.org/2000/svg"
              className="sun" x="0px" y="0px" width="100"
              height="100" viewBox="0 0 30 30"
            >
              <path d="M 14.984375 0.98632812 A 1.0001 1.0001 0 0 0 14 2 L 14 5 A 1.0001 1.0001 0 1 0 16 5 L 16 2 A 1.0001 1.0001 0 0 0 14.984375 0.98632812 z M 5.796875 4.7988281 A 1.0001 1.0001 0 0 0 5.1015625 6.515625 L 7.2226562 8.6367188 A 1.0001 1.0001 0 1 0 8.6367188 7.2226562 L 6.515625 5.1015625 A 1.0001 1.0001 0 0 0 5.796875 4.7988281 z M 24.171875 4.7988281 A 1.0001 1.0001 0 0 0 23.484375 5.1015625 L 21.363281 7.2226562 A 1.0001 1.0001 0 1 0 22.777344 8.6367188 L 24.898438 6.515625 A 1.0001 1.0001 0 0 0 24.171875 4.7988281 z M 15 8 A 7 7 0 0 0 8 15 A 7 7 0 0 0 15 22 A 7 7 0 0 0 22 15 A 7 7 0 0 0 15 8 z M 2 14 A 1.0001 1.0001 0 1 0 2 16 L 5 16 A 1.0001 1.0001 0 1 0 5 14 L 2 14 z M 25 14 A 1.0001 1.0001 0 1 0 25 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 25 14 z M 7.9101562 21.060547 A 1.0001 1.0001 0 0 0 7.2226562 21.363281 L 5.1015625 23.484375 A 1.0001 1.0001 0 1 0 6.515625 24.898438 L 8.6367188 22.777344 A 1.0001 1.0001 0 0 0 7.9101562 21.060547 z M 22.060547 21.060547 A 1.0001 1.0001 0 0 0 21.363281 22.777344 L 23.484375 24.898438 A 1.0001 1.0001 0 1 0 24.898438 23.484375 L 22.777344 21.363281 A 1.0001 1.0001 0 0 0 22.060547 21.060547 z M 14.984375 23.986328 A 1.0001 1.0001 0 0 0 14 25 L 14 28 A 1.0001 1.0001 0 1 0 16 28 L 16 25 A 1.0001 1.0001 0 0 0 14.984375 23.986328 z"></path>
            </svg>
          }
          {isDarkMode &&
            <svg
              onClick={toggleMode}
              xmlns="http://www.w3.org/2000/svg"
              className="moon"
              viewBox="0 0 384 512"
            >
              <path fill="currentColor" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
            </svg>
          }
        </div>
        <div className="xmark" onPointerUp={() => setTranslate(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
          </svg>
        </div>
      </header>

      <section className="add-section">
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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          onPointerUp={() => {
            if (discFieldValue.trim()) {
              addDisc(discFieldValue);
            }

            if (addDiscField.current)
              addDiscField.current.focus();
          }}
        >
          <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
        </svg>
      </section>

      <section className="current-discs">
        <span className='current-discs-label'>Your Discs</span>
        <section className="current-discs-container">

          {
            isLoadingDiscs 
            ? <LoadingDiscs />
            : (discs && discs.length) 
            ? discs.map(disc => {
                const finalDisc = disc.name.length > 25 ? `${disc.name.slice(0, 25).trimEnd()}...` : disc.name;
                return (
                  <Disc
                    disc={finalDisc}
                    title={disc.name}
                    discId={disc._id}
                    key={disc._id}
                    setDiscs={setDiscs}
                    deleteConfirmationRef={deleteConfirmationRef}
                    handleErrorMessage={handleErrorMessage}
                    discObject={disc}
                    setWatchTitle={setWatchTitle}
                    discs={discs}
                  />
                )
              }) 
              : 'There is no discs yet.'
          }
        </section>
      </section>

      <footer className="profile-settings-container">
        <div className="profile-img-container">
          <img src="/user_default.jfif" alt="Profile picture" />
        </div>
        <span onClick={async () => {
          try {
            await navigator.clipboard.writeText(username);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          } catch (error) {
            console.log('something went wrong');
          }
        }}>
          @{username}
          {
            isCopied 
            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
              </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448L480 448C515.3 448 544 419.3 544 384L544 183.4C544 166 536.9 149.3 524.3 137.2L466.6 81.8C454.7 70.4 438.8 64 422.3 64L288 64zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L352 496L352 512L160 512L160 256L176 256L176 192L160 192z"/>
              </svg>
          }
        </span>
        <div className="settings-btn-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/>
          </svg>
        </div>
      </footer> 
    </aside>
  );
}