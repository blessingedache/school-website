import express from "express";
import {
  registerStudent,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUser,
} from "../controllers/studentController.js";
import { authMiddleware } from "../middlewares/authorization.js";

const router = express.Router();

// Public routes
router.post("/register", registerStudent); // signup.jsx submits here
router.post("/login", loginUser); // signin.jsx submits here
router.post("/logout", logoutUser);

// Protected routes
router.get("/users", authMiddleware, getAllUsers);
router.get("/me", authMiddleware, getCurrentUser);

export default router;