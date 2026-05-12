import axios from "axios";
import DiscModel from "../models/disc.model";
import { Request, Response } from "express";

export const fetchDiscs = async (req: Request, res: Response) => {
  try {
    const discs = await DiscModel.find({ user: req.userId });

    if (!discs.length) return res.status(404).json({ message: "You seem to not have any discs yet.", success: false });

    res.status(200).json({ message: "Discs fetched successfully.", discs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const fetchOneDisc = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const disc = await DiscModel.findById(id);

    if (!disc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false });

    const videos = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: "snippet,contentDetails,statistics",
        key: process.env.YOUTUBE_API_KEY as string,
        id: disc.videos.join(',')
      }
    });

    res.status(200).json({
      message: "Disc was fetched successfully.",
      success: true,
      videos: videos.data,
      disc: disc
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const createDisc = async (req: Request, res: Response) => {
  try {
    const { name, videos, subDiscs } = req.body;

    if (!name || name.length < 5) return res.status(400).json({
      message: "Discs must have a unique name that's at least 5 characters long.",
      success: false
    });

    const isDisc = await DiscModel.findOne({ $and: [{ name }, { user: req.userId }] });
    if (isDisc) return res.status(400).json({
      message: "Disc already exists. Try a different name.",
      success: false
    });

    const disc = await DiscModel.create({
      name,
      user: req.userId,
      videos: videos || [],
      subDiscs: subDiscs || []
    });

    if (!disc) return res.status(400).json({ message: "Failed to create disc. Please, try again!" });

    res.status(201).json({
      message: "A new disc has been created successfully",
      disc,
      success: true,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const updateDisc = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, subDiscs, videos } = req.body;
    if (!name && !subDiscs && !videos) return res.status(400).json({ message: "No new info for updating disc. Please, try again!", success: false });

    const updatedDisc = await DiscModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDisc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false });

    const updatedVideos = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: "snippet,contentDetails,statistics",
        key: process.env.YOUTUBE_API_KEY as string,
        id: updatedDisc.videos.join(',')
      }
    });

    console.log(updatedVideos);

    res.status(200).json({
      message: "Disc was updated successfully",
      success: false,
      disc: updatedDisc,
      videos: updatedVideos.data
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const deleteDisc = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const disc = await DiscModel.findByIdAndDelete(id);

    if (!disc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false });

    res.status(200).json({ message: "Disc was deleted successfully.", success: true, disc });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}