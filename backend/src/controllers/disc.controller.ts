import axios from "axios";
import DiscModel from "../models/disc.model";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const fetchDiscs = async (req: Request, res: Response) => {
  try {
    const discs = await DiscModel.find({ $and: [{ user: req.userId }, { parentId: null }] });

    if (!discs.length) return res.status(404).json({ message: "You seem to not have any discs yet.", success: false });

    res.status(200).json({ message: "Discs fetched successfully.", discs, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const fetchSubDiscs = async (req: Request, res: Response) => {
  try {
    const { parentId } = req.params;
    const userId = req.userId;

    if (!userId || !parentId) return res.status(400).json({
      message: "Can't fetch data without providing both user and parent IDs",
      success: false,
    });

    const subDiscs = await DiscModel.find({ $and: [{ user: userId }, { parentId }]});
    
    if (!subDiscs) return res.status(404).json({
      message: "Seems like this disc doesn't have any corresponding subdiscs",
      success: false
    });

    res.status(200).json({
      message: "Subdiscs were fetched successfully",
      success: true,
      discs: subDiscs
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong on the server side. Try again later",
      success: false
    });
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
    const { name, videos, parentId } = req.body;

    if (!name || name.length < 5) return res.status(400).json({
      message: "Discs must have a unique name that's at least 5 characters long.",
      success: false
    });

    let ancestors: mongoose.Types.ObjectId[] = [];

    if (parentId) {
      const parentDisc = await DiscModel.findById(parentId);
      if (!parentDisc) return res.status(404).json({
        message: "Parent disc not found",
        success: false
      });

      ancestors = [...parentDisc.ancestors, parentId];
    }

    const isDisc = await DiscModel.findOne({ $and: [{ name }, { user: req.userId }, { parentId }] });
    if (isDisc) return res.status(400).json({
      message: "Disc already exists. Try a different name.",
      success: false
    });

    const disc = await DiscModel.create({
      name,
      user: req.userId,
      videos: videos || [],
      parentId: parentId || null,
      ancestors
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
    const userId = req.userId;
    const { name, videos, parentId } = req.body;
    if (!name && !videos) return res.status(400).json({ message: "No new info for updating disc. Please, try again!", success: false });

    if (name) {
      const isDisc = await DiscModel.findOne({ $and: [{ name }, { user: userId }, { parentId }]});
      if (isDisc && String(isDisc._id) !== id) return res.status(400).json({ 
        message: "Disc already exists. Please, try with a different name", 
        success: false
      });
    }
    
    const updatedDisc = await DiscModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDisc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false });

    res.status(200).json({
      message: "Disc was updated successfully",
      success: false,
      disc: updatedDisc,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const deleteDisc = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const disc = await DiscModel.deleteMany({ $or: [{ _id: id }, { ancestors: id }]});

    if (!disc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false });

    res.status(200).json({ message: "Disc was deleted successfully.", success: true, disc: { _id: id } });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}