import { useEffect, useRef, useState } from 'react';
import { handleDuration, handleViewCount, youtubeTimeAgo } from '../../formatting';
import { Actions } from './Actions';
import './ChannelVideos.scss';
import { DiscsActions } from './DiscsActions';
import { AddNewDisc } from './AddNewDisc';

export function VideoGrid({
  channelLogo,
  videos,
  setDiscs,
  setTranslate,
  handleErrorMessage
}) {
  // This is the section for setting up all the variables and states and other hooks
  const [openIndex, setOpenIndex] = useState(null); // The state that toggles the disc actions on and off
  const [openDisc, setOpenDisc] = useState(null); // The state that toggles the discs on and off
  const [openNewAdder, setOpenNewAdder] = useState(null); // The state the toggles the new disc adder on and off
  const actionsContainerRef = useRef(null); // The reference to the actions container
  const discsContainerRef = useRef(null); // The reference to the discs container
  const dotsContainer = useRef(null); // The reference to the video dots
  const newAdderContainerRef = useRef(null); //The reference to the new disc adder container
  const videoBackgroundList = [ // The list of colors picked for the video hover effect
    '#d2042d33',
    '#5d145133',
    '#01796f33',
    '#00a86a33',
    '#b5672733',
    '#a52a2a33',
    '#80808033',
    '#0e4c9233',
    '#1134a633',
    '#f4ba1c33'
  ];
  const [videoBackgroundColor, setVideoBackgroundColor] = useState('initial');
  const [hoveredVideo, setHoveredVideo] = useState(undefined);
  const [isOpenTop, setIsOpenTop] = useState(false);

  //The function that handles hidding the actions, discs, and new disc adder when clicking on the screen
  useEffect(() => {
    /* 
      If the clicked element isn't the actions container, nor the discs container, nor the dots 
      , nor the new disc adder container, then hide all of these elements listed formerly
    */
    function hideActions(e) {
      if (
        !actionsContainerRef.current?.contains(e.target) &&
        !discsContainerRef.current?.contains(e.target) &&
        !dotsContainer.current?.contains(e.target) &&
        !newAdderContainerRef.current?.contains(e.target)
      ) {
        setOpenIndex(null);
        setOpenDisc(null);
        setOpenNewAdder(null);
      }
    }

    document.addEventListener('pointerdown', hideActions);
  });

  //The JSX of the videos grid when searching for a channel
  return (
    <section className='video-section'>
      {
        // If the videos from the YouTube data API returns the videos for that channel, then  render those videos onto the page
        Object.hasOwn(videos, 'items') &&
        videos.items.map((item, index) => { // Loop through the video list and return each video and render it on the page
          return (
            <div
              key={item.id}
              style={hoveredVideo === index ? { backgroundColor: videoBackgroundColor } : undefined} // Set the background-color to a random color from the array above to mimic the YouTube video hover effect
              className='video-container'
              onMouseEnter={() => { //The event that handles the functionality of the hover effect of the video
                const randomNum = Math.floor(Math.random() * videoBackgroundList.length);
                setVideoBackgroundColor(videoBackgroundList[randomNum]);
                setHoveredVideo(index);
              }}
              onMouseLeave={() => setHoveredVideo(undefined)} // Reset color when the hover is over
            >
              <div className="video">
                <img 
                  className='video-thumbnail' 
                  loading="lazy" 
                  src={
                    item.snippet.thumbnails.maxres?.url || 
                    item.snippet.thumbnails.standard?.url ||
                    item.snippet.thumbnails.high?.url ||
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url ||
                    'default-thumbnail.png'
                  } 
                  alt="video thumbnail" 
                />
                <div className="video-duration">
                  {handleDuration(videos.items[index].contentDetails.duration)} {/* Convert the duration from the ISO format into a human readable format like that of YouTube */}
                </div>
              </div>
              <div className="video-info">
                <div className="video-channel-logo-container">
                  <img src={channelLogo.items.find(channel => channel.id === item.snippet.channelId)?.snippet.thumbnails.default.url || 'default-thumbnail.png'} alt="" /> {/*channelLogo.items[index]?.snippet.thumbnails.default.url*/}
                </div>
                <div className="video-details">
                  <span className="video-title">{item.snippet.title}</span>
                  <span className="video-channel-name">{item.snippet.channelTitle}</span>
                  <span className="views-videoLife">{handleViewCount(videos.items[index].statistics.viewCount)} views &#8226; {youtubeTimeAgo(item.snippet.publishedAt)}</span> {/* handle the view count and the upload time of the video */}
                </div>
                <div className="dots-container">
                  <svg
                    xmlns="../assets/dots.svg"
                    viewBox="0 0 640 640"
                    className='three-dots-video'
                    onPointerUp={(e) => {
                      openIndex === index ? setOpenIndex(null) : setOpenIndex(index); // Toggle the actions when clicking the three dots
                      setOpenDisc(null); // Hide the discs whenever user clicks the three dots
                      setOpenNewAdder(null); // Hide new disc adder whenever user clicks the three dots
                      dotsContainer.current = e.target; // Set the dots reference

                      // Render the actions elements and it's subsequent element optimully with the view 
                      if (e.clientY >= 700) {
                        setIsOpenTop(true);
                      } else {
                        setIsOpenTop(false);
                      }
                    }}
                  >
                    <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
                  </svg>
                </div>
              </div>
              {
                openIndex === index &&
                // The Actions component
                <Actions
                  setOpenDisc={setOpenDisc}
                  index={index}
                  actionsContainerRef={actionsContainerRef}
                  setOpenNewAdder={setOpenNewAdder}
                  isOpenTop={isOpenTop}
                />
              }
              {
                (openDisc === index && openIndex === index) &&
                // The DiscsActions component
                <DiscsActions
                  discsContainerRef={discsContainerRef}
                  videoId={item.id}
                  handleErrorMessage={handleErrorMessage}
                  setOpenDisc={setOpenDisc}
                  setOpenIndex={setOpenIndex}
                  isOpenTop={isOpenTop}
                />
              }
              {
                openNewAdder === index &&
                // The new disc adder component
                <AddNewDisc
                  newAdderContainerRef={newAdderContainerRef}
                  setDiscs={setDiscs}
                  setOpenIndex={setOpenIndex}
                  setOpenNewAdder={setOpenNewAdder}
                  setTranslate={setTranslate}
                  handleErrorMessage={handleErrorMessage}
                  videoId={item.id}
                  isOpenTop={isOpenTop}
                />
              }
            </div>
          );
        })
      }
    </section>
  );
}