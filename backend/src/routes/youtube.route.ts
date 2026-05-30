import { Router } from "express";
import { fetchChannelsData, fetchVideossData } from "../controllers/youtube.controller";

const router = Router();

router.get('/channels', fetchChannelsData);
router.get('/videos', fetchVideossData);

export default router;