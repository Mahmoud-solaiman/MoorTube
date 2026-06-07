import { Router } from "express";
import { fetchChannelsData, fetchChannelVideos, fetchSingleVideo, fetchVideossData } from "../controllers/youtube.controller";

const router = Router();

router.get('/channels', fetchChannelsData);
router.get('/videos', fetchVideossData);
router.get('/channel', fetchChannelVideos);
router.get('/videos/:id', fetchSingleVideo);

export default router;