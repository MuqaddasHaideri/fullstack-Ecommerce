import express from "express";
import { signupController } from "../controllers/signupController.js";
import { loginController } from "../controllers/loginController.js";
import { loginValidation, signupValidation } from "../middleware/validation.js";
import { isAuthenticated } from "../middleware/verifyAPI.js";

const router = express.Router();

router.post("/signup",signupController,signupValidation);

router.post("/login",loginController,loginValidation);

export default router;