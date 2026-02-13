import express from "express";
import { generate } from "../controllers/generateController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, generate);

export default router;
