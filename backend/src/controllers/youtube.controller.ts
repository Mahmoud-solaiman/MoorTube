import axios from "axios";
import { Request, Response } from "express"
import { ChannelItem, PlaylistInfoItem, VideosChannelsItem, VideosItem } from "../types/types";
import { filterSearch } from "../utils/helpers";

export const fetchChannelsData = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (filterSearch(q)) return res.status(400).json({
      message: "Can't perform this search. Potentially inappropriate content!",
      success: false
    });

    const channelsRequest = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q,
        key: process.env.YOUTUBE_API_KEY as string,
        maxResults: 5,
        type: 'channel'
      }
    });

    if (!channelsRequest.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    const channelInfo = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'snippet',
        key: process.env.YOUTUBE_API_KEY as string,
        id: channelsRequest.data.items.map((item: ChannelItem) => item.id.channelId).join(',') // We loop through the channels set up the new request to pull up the needed data for all of the returned channels
      }
    });

    if (!channelInfo.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    res.status(200).json({ message: "Channels were fetched successfully", success: true, data: channelInfo.data });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server side!", success: false, error });
  }
}

export const fetchVideossData = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (filterSearch(q)) return res.status(400).json({
      message: "Can't perform this search. Potentially inappropriate content!",
      success: false
    });
    
    const videosRequest = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q,
        key: process.env.YOUTUBE_API_KEY as string,
        maxResults: 27,
        type: 'video'
      }
    });

    if (!videosRequest.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    const channelsLogos = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'snippet',
        key: process.env.YOUTUBE_API_KEY as string,
        id: videosRequest.data.items.map((item: VideosChannelsItem) => item.snippet.channelId).join(',')
      }
    });

    if (!channelsLogos.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    const videosDetails = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        key: process.env.YOUTUBE_API_KEY as string,
        id: videosRequest.data.items.map((item: VideosItem) => item.id.videoId).join(',')
      }
    });

    if (!videosDetails.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    res.status(200).json({
      message: "Channels were fetched successfully",
      success: true,
      videosDetails: videosDetails.data,
      channelsLogos: channelsLogos.data
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server side!", success: false, error });
  }
}

export const fetchChannelVideos = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    // Make request to YouTube API, channels resource, to pull the IDs of the playlist of the last 50 videos uploaded to that particular channel
    const request = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'contentDetails',
        key: process.env.YOUTUBE_API_KEY as string,
        id
      }
    });

    if (!request.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    // Then make a request to the YouTube API, playlistItems resource, to pull the videos of that channel
    const uploadPlaylistInfo = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        key: process.env.YOUTUBE_API_KEY as string,
        part: 'snippet, contentDetails',
        playlistId: request.data.items[0].contentDetails.relatedPlaylists.uploads,
        maxResults: '27'
      }
    });

    if (!uploadPlaylistInfo.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    // Make another request to the YouTube API, videos resource, to pull the duration, view count, and publish time
    const videoStats = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        key: process.env.YOUTUBE_API_KEY as string,
        id: uploadPlaylistInfo.data.items.map((item: PlaylistInfoItem) => item.contentDetails.videoId).join(',')
      }
    });

    if (!videoStats.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    res.status(200).json({ 
      message: "Channel videos were fetched successfully", 
      success: true, 
      videoStats: videoStats.data
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server side!", success: false, error });
  }
}

export const fetchSingleVideo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const videosDetails = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        key: process.env.YOUTUBE_API_KEY as string,
        id
      }
    });

    if (!videosDetails.data) return res.status(500).json({ message: "Something went wrong when attempting to connect to The YouTube API", success: false });

    res.status(200).json({
      message: "Video details fetched successfully",
      success: true,
      video: videosDetails.data
    })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on the server side!", success: false, error });
  }
}