// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';
import {
  MediaPlayer,
  MediaProvider,
  TimeSlider,
  Gesture,
  Spinner,
  Poster
} from '@vidstack/react';
import './VideoPlayer.scss';
import { useState, useRef } from 'react';
import { Controls } from './Controls';
import { useSearchParams } from 'react-router-dom';
import ControlsMobile from './ControlsMobile';
import BlurBox from '../../components/BlurBox';
import VideoPlayerSettings from './VideoPlayerSettings';
import PlaySpeedControls from '../../components/PlaySpeedControls';
import NoteTakers from '../../components/NoteTakers';
import Note from '../../components/Note';
import { NoteTakerType } from '../../types/types';

export function VideoPlayer({ poster }: { poster: string }) {
  const [isBlur, setIsBlur] = useState(false);
  const [searchParams] = useSearchParams();
  const [isShowControls, setIsShowControls] = useState(false);
  const video = `https://youtube.com/watch?v=${searchParams.get('v')}`;
  const isActive = useRef<number | undefined>(undefined);
  const [isMuted, setIsMuted] = useState(true);
  const [blurBoxes, setBlurBoxes] = useState<string[]>([]);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [isSpeedSettings, setIsSpeedSettings] = useState<boolean>(false);
  const [ isNoteTakers, setIsNoteTakers ] = useState<boolean>(false);
  const [ notes, setNotes ] = useState<NoteTakerType[]>([]);
  const [noteTakers, setNoteTakers] = useState<NoteTakerType[]>([]);

  function hideControls() {
    setIsShowControls(true);
    clearTimeout(isActive.current);

    isActive.current = setTimeout(() => setIsShowControls(false), 3000);
  }

  function handleControlsMobile() {
    if (isShowControls) {
      setIsShowControls(false);

    } else if (!isShowControls) {
      setIsShowControls(true);
      clearTimeout(isActive.current);

      isActive.current = setTimeout(() => setIsShowControls(false), 3000);
    }
  }

  return (
    <MediaPlayer
      src={video}
      key={searchParams.get('v')}
      storage={`video-player-${searchParams.get('v')}`}
      muted={isMuted}
      onPlaying={() => setIsMuted(false)}
      autoPlay
      playsInline
      className="player-container"
      onPointerLeave={e => {
        if (e.pointerType !== 'mouse') return;
        setIsShowControls(false);
      }}
      onPointerMove={e => {
        if (e.pointerType !== 'mouse') return;
        hideControls();
      }}
      onTouchEnd={handleControlsMobile}
      style={{ cursor: isShowControls ? 'default' : 'none' }}
    >
      <MediaProvider />

      <Poster
        src={poster}
        alt="video poster"
        className="vds-poster"
      />

      <Gesture className="vds-gesture" event="dblmouseup" action="toggle:fullscreen" />
      <Gesture className="vds-gesture" event="mouseup" action="toggle:paused" />

      <Gesture className="vds-gesture-mobile" event="dbltouchstart" action="seek:10" />
      <Gesture className="vds-gesture-mobile" event="dbltouchstart" action="seek:-10" />

      {
        isBlur &&
        <div aria-hidden="true" className="blur-layer"></div>
      }

      <BlurBox blurBoxes={blurBoxes} setBlurBoxes={setBlurBoxes} />

      <div className="vds-buffering-indicator">
        <Spinner.Root className="vds-buffering-spinner">
          <Spinner.Track className="vds-buffering-track" />
          <Spinner.TrackFill className="vds-buffering-track-fill" />
        </Spinner.Root>
      </div>

      <TimeSlider.Root className={isShowControls ? "timeslider" : "timeslider hidden"}>
        <TimeSlider.Track className="timeslider-track" />
        <TimeSlider.TrackFill className="timeslider-trackfill" />
        <TimeSlider.Progress className="timeslider-progress" />
        <TimeSlider.Thumb className="timeslider-thumb" />
      </TimeSlider.Root>

      <Controls
        isBlur={isBlur}
        setIsBlur={setIsBlur}
        isShowControls={isShowControls}
        hideControls={hideControls}
        isSettings={isSettings}
        isSpeedSettings={isSpeedSettings}
        isNoteTakers={isNoteTakers}
        setIsNoteTakers={setIsNoteTakers}
        setIsSettings={setIsSettings}
        setIsSpeedSettings={setIsSpeedSettings}
      />
      {
        isSettings &&
        <VideoPlayerSettings
          setIsSpeedSettings={setIsSpeedSettings}
          setIsSettings={setIsSettings}
          setBlurBoxes={setBlurBoxes}
          blurBoxes={blurBoxes}
          setIsNoteTakers={setIsNoteTakers}
        />
      }

      {
        isSpeedSettings &&
        <PlaySpeedControls
          setIsSpeedSettings={setIsSpeedSettings}
          setIsSettings={setIsSettings}
        />
      }

      {
        isNoteTakers &&
        <NoteTakers
          setIsNoteTakers={setIsNoteTakers}
          setIsSettings={setIsSettings}
          setNotes={setNotes}
          notes={notes}
          setNoteTakers={setNoteTakers}
          noteTakers={noteTakers}
        />
      }

      {
        (notes && notes.length) 
        ? notes.map(note => {
          return (
            <Note 
              note={note}
              notes={notes}
              key={note._id}
              setNotes={setNotes}
              setNoteTakers={setNoteTakers}
              noteTakers={noteTakers}
            />
          );
        })
        : undefined
      }

      {/* <ControlsMobile
        isBlur={isBlur}
        setIsBlur={setIsBlur}
        isShowControls={isShowControls}
        hideControls={hideControls}
      /> */}

    </MediaPlayer>
  );
}