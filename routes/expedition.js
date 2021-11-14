import express from "express";

const router = express.Router();

import {uploadExpedition, getExpedition, getIndExp} from "../controllers/expedition.js";

router.post("/expedition/uploadExpedition", uploadExpedition);
router.get("/expedition/getExpedition",getExpedition);
router.get("/expedition/:id", getIndExp);

export default router;
