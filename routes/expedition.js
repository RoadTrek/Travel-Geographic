import express from "express";

const router = express.Router();

import {uploadExpedition, getExpedition} from "../controllers/expedition.js";

router.post("/expedition/uploadExpedition", uploadExpedition);
router.get("/expedition/getExpedition",getExpedition);

export default router;
