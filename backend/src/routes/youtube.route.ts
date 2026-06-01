import { Router } from "express";
import { fetchChannelsData, fetchChannelVideos, fetchVideossData } from "../controllers/youtube.controller";

const router = Router();

router.get('/channels', fetchChannelsData);
router.get('/videos', fetchVideossData);
router.get('/channel', fetchChannelVideos);

export default router;