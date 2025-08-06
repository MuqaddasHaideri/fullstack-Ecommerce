import UserSchemaModel from "../models/userSchema.js";
import bcrpt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const loginController = async ( req,res) => {
  try {
    const { email, password } = req.body;

    //feilds should not be empty !!
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    //checking for user if they exists
const userExists = await UserSchemaModel.findOne({ email });

    if (!userExists) {
      return res.status(403).json({
        message: "Auth failed! email or password is wrong",
        success: false,
      });
    }

    const isPasswordEqual = await bcrpt.compare(password, userExists.password);

    if (!isPasswordEqual) {
      return res.status(403).json({
        message: "Auth failed! email or password is wrong",
        success: false,
      });
    }

    const jwt_token = jwt.sign(
      {
        email: userExists.email,
        _id: userExists._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "24hr" }
    );
    res.status(200).json({
      message: "login successfully",
      success: true,
      jwt_token,
      name: userExists.name,
      email,
    });
  } catch (error) {
    console.log("error in login controller : ", error);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
