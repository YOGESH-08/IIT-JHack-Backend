import express from 'express';
import {googleAuthController, logout} from '../controllers/authController.js';

const router = express.Router();

router.post("/google", googleAuthController);
router.post("/logout", logout);

export default router;