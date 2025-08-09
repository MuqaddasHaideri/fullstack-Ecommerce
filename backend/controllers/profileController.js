import UserSchemaModel from "../models/userSchema.js";

export const getProfile = async (req, res) => {
  try {
    const user = await UserSchemaModel.findById(req.user);
    if (!user) {
        console.error("Checking whats in the req.userid>>>>",req.user)
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error in getting profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await UserSchemaModel.findByIdAndUpdate(req.user, req.body, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error in updating profile" });
  }
};