import axios from "axios";
import { Request, Response } from "express"
import { ChannelItem, VideosChannelsItem, VideosItem } from "../types/types";

export const fetchChannelsData = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

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