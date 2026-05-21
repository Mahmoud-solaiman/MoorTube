import { Router } from "express";
import { protectDiscRoutes } from "../middleware/disc.middleware";
import { createNote, deleteNote, fetchAllNotes, updateNote } from "../controllers/note.controller";

const router = Router();

router.post('/create', protectDiscRoutes, createNote) // Route to create a new note taker
router.get('/', protectDiscRoutes, fetchAllNotes) // Route to fetch all note takers
router.put('/update/:id', protectDiscRoutes, updateNote) // Route to update a note taker by id
router.delete('/delete/:id', protectDiscRoutes, deleteNote) // Route to delete a note taker by id

export default router;