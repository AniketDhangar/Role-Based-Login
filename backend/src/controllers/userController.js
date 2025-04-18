import { User } from "../models/UserSchema.js";
import bcrypt from "bcrypt";


// Get all users
const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find() 
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { userid } = req.body;
    if (!userid) return res.status(400).json({ message: "User ID is required" });

    const deletedUser = await User.findByIdAndDelete(userid);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user

const updateUser = async (req, res) => {
  try {
    const { userid, email, password } = req.body;

    if (!userid) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updateFields = {};
    if (email) updateFields.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export { getAllUser,deleteUser,updateUser };