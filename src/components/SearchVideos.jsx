import { VideoGrid } from "./VideoGrid";

export function SearchVideos({
  channelLogo,
  videos,
  setDiscs,
  setTranslate,
  handleErrorMessage,
  setVideoPlayerSrc
}) {
  return (
    <VideoGrid
      channelLogo={channelLogo}
      videos={videos}
      setDiscs={setDiscs}
      setTranslate={setTranslate}
      handleErrorMessage={handleErrorMessage}
      setVideoPlayerSrc={setVideoPlayerSrc}
    />
  );
}