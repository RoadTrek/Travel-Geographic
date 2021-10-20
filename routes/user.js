import express from 'express';
const router = express.Router();

import {loginUser} from '../controllers/user.js';

router.post("/login", loginUser);


export default router;