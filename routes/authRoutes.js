import express from "express";

import { Login, Register } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", Register);

// @route   POST /api/auth/login
// @desc    Login user
router.post("/login", Login);

export default router;
