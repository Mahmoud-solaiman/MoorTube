import { Router } from "express";
import { createDisc, deleteDisc, fetchDiscs, fetchOneDisc, updateDisc } from "../controllers/disc.controller";

const router = Router();

router.get('/all', fetchDiscs); // Fetch all user discs
router.get('/:id', fetchOneDisc); // Fetch one single disc
router.post('/create', createDisc); // Create a new disc
router.put('/update/:id', updateDisc); // Update one single disc
router.delete('/delete/:id', deleteDisc); // Delete one single disc

export default router;