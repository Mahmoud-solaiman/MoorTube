import DiscModel from "../models/disc.model";
import { Request, Response } from "express";
// import { generateID } from '../../../frontend/utils/formatting';

export const fetchDiscs = async (req: Request, res: Response) => {
  try {
    const discs = await DiscModel.find({ user: "69fc45985c747c799069d278"});

    if (!discs.length) return res.status(404).json({ message: "You seem to not have any discs yet.", success: false});

    res.status(200).json({ message: "Discs fetched successfully.", discs, success: true});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error});
  }
}

export const fetchOneDisc = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const disc = await DiscModel.findById(id);

    if (!disc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false});

    res.status(200).json({ message: "Disc was fetched successfully.", success: true, disc });
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error});
  }
}

export const createDisc = async (req: Request, res: Response) => {
  try {
    const { id, name, videos, subDiscs } = req.body;
    
    if (!name || name.length < 6) return res.status(400).json({ 
      message: "Discs should have a unique name that's at least 5 characters long.",
      success: false
    });

    const isDisc = await DiscModel.findOne({ $and: [{ name }, { user: "69fc45985c747c799069d278" }]});
    if (isDisc) return res.status(400).json({ 
      message: "Disc already exists. Try a different name.",
      success: false 
    });

    const disc = await DiscModel.create({
      id: id || 'x9TpQRUiwLXkFVX',
      name,
      user: "69fc45985c747c799069d278",
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
    res.status(500).json({ message: "Internal Server Error", error});
  }
}

export const updateDisc = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, subDiscs, videos} = req.body;
    if (!name && !subDiscs && !videos) return res.status(400).json({ message: "No new info for updating disc. Please, try again!", success: false});
    
    const updatedDisc = await DiscModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDisc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false});

    res.status(201).json({ message: "Disc was updated successfully", success: false, disc: updatedDisc});
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error});
  }
}

export const deleteDisc = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const disc = await DiscModel.findByIdAndDelete(id);
    
    if (!disc) return res.status(404).json({ message: "Oops! Disc was not found.", success: false});

    res.status(200).json({ message: "Disc was deleted successfully.", success: true, disc });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error});
  }
}