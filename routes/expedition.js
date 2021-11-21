import express from "express";

const router = express.Router();

import {showReviews, submitReview, declineRequest, approveRequest, registerUser,getPendingRequests, uploadExpedition, getExpedition, getIndExp, uploadExpImage, requestAdminExp} from "../controllers/expedition.js";

router.post("/expedition/uploadExpedition", uploadExpedition);
router.post("/expedition/uploadExpImage", uploadExpImage);
router.get("/expedition/getExpedition",getExpedition);
router.post("/expedition/requestAdminExp", requestAdminExp);
router.post("/expedition/registerUser",registerUser);
router.get("/expedition/pendingRequests/:id", getPendingRequests);
router.post("/expedition/approveRequest/:id", approveRequest);
router.post("/expedition/declineRequest/:id", declineRequest);
router.post("/expedition/submitReview", submitReview);
router.get("/expedition/showReviews/:id", showReviews);
router.get("/expedition/:id", getIndExp);

export default router;
