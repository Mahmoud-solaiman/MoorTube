import NoteModel from "../models/note.model";
import { Request, Response } from "express";

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, description, videoId } = req.body;
    if (!title || !videoId) res.status(400).json({ message: "Both video ID and note title are required for creating a new note", success: false });

    const newNote = await NoteModel.create({
      videoId,
      user: req.userId,
      title,
      description
    });

    res.status(201).json({ message: "A new note taker has been created successfully", success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const fetchAllNotes = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.body;
    const userId = req.userId;
    if(!videoId) res.status(400).json({ message: "The video ID is neccessary for fetching this videos notes", success: false });

    const noteTakers = await NoteModel.find({ user: userId, videoId });

    if(!noteTakers.length) res.status(404).json({ message: "You have no notes for this video. Try and add a new note taker", success: false });

    res.status(200).json({ message: "Notes have been fetched successfully", success: true, notes: noteTakers });
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: "ID is required for updating your notes", success: false });

    const updatedNote = await NoteModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedNote) res.status(404).json({ message: "Couldn't update notes because none has been found for the provided ID", success: false });

    res.status(200).json({ message: "Your notes have been updated successfully", success: true, note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) res.status(400).json({ message: "ID is required for deleting this note taker", success: false });

    const deletedNote = await NoteModel.findByIdAndDelete(id);
    if (!deletedNote) res.status(404).json({ message: "Couldn't delete this note taker. Maybe it doesn't exist in the database", success: false });

    res.sendStatus(204);
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}