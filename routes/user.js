import express from "express";

const router = express.Router();

import {profile,getData, uploadImage,loginUser,logoutUser, signupUser} from "../controllers/user.js";



router.post("/user/uploadImage", uploadImage);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/profile", profile);
router.get("/user/getData/:id",getData);
export default router;
