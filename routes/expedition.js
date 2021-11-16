import express from "express";

const router = express.Router();

import {uploadExpedition, getExpedition, getIndExp, uploadExpImage} from "../controllers/expedition.js";

router.post("/expedition/uploadExpedition", uploadExpedition);
router.post("/expedition/uploadExpImage", uploadExpImage);
router.get("/expedition/getExpedition",getExpedition);
router.get("/expedition/:id", getIndExp);

export default router;
