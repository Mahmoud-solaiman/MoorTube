import { Router } from "express";
import { createDisc, deleteDisc, fetchDiscs, fetchOneDisc, fetchSubDiscs, updateDisc } from "../controllers/disc.controller";
import { protectDiscRoutes } from "../middleware/disc.middleware";

const router = Router();

router.get('/', protectDiscRoutes, fetchDiscs); // Fetch all user discs
router.get('/subdiscs/:parentId', protectDiscRoutes, fetchSubDiscs); // Fetch subdiscs for a given disc
router.get('/:id', protectDiscRoutes, fetchOneDisc); // Fetch one single disc
router.post('/create', protectDiscRoutes, createDisc); // Create a new disc
router.put('/update/:id', protectDiscRoutes, updateDisc); // Update one single disc
router.delete('/delete/:id', protectDiscRoutes, deleteDisc); // Delete one single disc

export default router;