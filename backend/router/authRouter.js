import express from "express";
import { signupController } from "../controllers/signupController.js";
import { loginController } from "../controllers/loginController.js";
import { loginValidation, signupValidation } from "../middleware/validation.js";
import { isAuthenticated } from "../middleware/verifyAPI.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";


const router = express.Router();

router.post("/signup", signupController, signupValidation);

router.post("/login", loginController, loginValidation);

router.get("/profile", isAuthenticated, getProfile);

router.put("/profile", isAuthenticated, updateProfile);


export default router;