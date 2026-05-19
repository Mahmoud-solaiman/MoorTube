import { Link, useSearchParams } from 'react-router-dom';
import './SavedVideosHeader.scss';
import { SavedVideosHeaderProps, SingleDiscResponse } from '../../types/types';
import { useEffect, useState } from 'react';
import API from '../../api/axios';

export function SavedVideosHeader({ 
    discName, 
    setTranslate, 
    menuContainer, 
    isDarkMode
  }: SavedVideosHeaderProps) {
    const [ searchParams ] = useSearchParams();
    const discId = searchParams.get('discId');
    const [ discTitle, setDiscTitle ] = useState<string>('');
    
    useEffect(() => {
      const fetchDisc = async () => {
        try {
          if (!discId) return;
          console.log(discId);
          const disc: SingleDiscResponse = await API.get(`/discs/${discId}`);

          setDiscTitle(disc.data.disc.name);
        } catch (error) {
          console.log('Something went wrong when connecting with the server'); 
        }
      }
      fetchDisc();
    }, []);
  return (
    <header className="saved-videos-header">
      <div className="logo-menu-container">
        <div title="Menu" className="menu-container" ref={menuContainer}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 640 640"
            onPointerUp={() => {
              setTranslate(true);
            }}  
          >
            <path
              d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"
            />
          </svg>
        </div>
        <div className="logo-container" title="MoorTube Home">
          <Link to="/home">
            <img src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"} alt="website logo" />
          </Link>
          
        </div>
      </div>

      <h1 className="disc-name-title">
        {discTitle || discName}
      </h1>
    </header>
  );
}