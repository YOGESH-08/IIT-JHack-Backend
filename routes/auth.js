import express from 'express';
import {googleAuthController} from '../controllers/authController.js';

const router = express.Router();

router.post("/google", googleAuthController);

export default router;