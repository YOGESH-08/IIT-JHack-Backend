import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

// GET /api/profile/:uid
router.get("/:uid", getProfile);

// PUT /api/profile/:uid
router.put("/:uid", updateProfile);

export default router;
