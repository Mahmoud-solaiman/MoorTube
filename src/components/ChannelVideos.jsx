import { VideoGrid } from "./VideoGrid";

export function ChannelVideos({
  channelLogo,
  videos,
  setDiscs,
  setTranslate,
  handleErrorMessage
}) {
  return (
    <VideoGrid
      channelLogo={channelLogo}
      videos={videos}
      setDiscs={setDiscs}
      setTranslate={setTranslate}
      handleErrorMessage={handleErrorMessage}
    />
  );
}