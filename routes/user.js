import express from "express";

const router = express.Router();

import {profile, loginUser,logoutUser, signupUser} from "../controllers/user.js";
import user from "../models/user.js";

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/signup", signupUser);
router.post("/profile", profile);

export default router;
