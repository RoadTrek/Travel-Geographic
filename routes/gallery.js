import express from "express";

const router = express.Router();

import {uploadImage, getImage} from "../controllers/gallery.js";

router.post("/gallery/uploadImage", uploadImage);
router.get("/gallery/getImage",getImage);

export default router;
