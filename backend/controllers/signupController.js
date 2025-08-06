import UserSchemaModel from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const userExists = await UserSchemaModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists",
        success: false,
      });
    }

    const encodedName = encodeURIComponent(name);
    const avatar = `https://avatar.iran.liara.run/username?username=${encodedName}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserSchemaModel({
      name,
      email,
      password: hashedPassword,
      profilePic: avatar,
    });

    await newUser.save();

    res.status(201).json({
      message: "User has been created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
      success: true,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
