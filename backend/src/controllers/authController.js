import { User } from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, password, role } = req.body;

  try {
    const isExistedUser = await User.findOne({ email });
    if (isExistedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const addedUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "registration done", addedUser });
  } catch (error) {
    console.log("Error details: ", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Validate email format (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Find user
    const loggedUser = await User.findOne({ email }).select("+password");
    if (!loggedUser) {
      return res.status(401).json({ message: "User not found" });
    }

    // Compare password securely
    const isMatch = await bcrypt.compare(password, loggedUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: loggedUser._id, role: loggedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie with token
    res.cookie("authToken", token, {
      secure: false,
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      maxAge: 3600000, // 1 hour expiration time
      sameSite: "strict", // Helps prevent CSRF attacks
    });

    // Send response without password
    const { _id, name, role } = loggedUser;
    res.status(200).json({
      message: "Login successful",
      loggedUser: { _id, name, email, role },
      token,
    });
  } catch (error) {
    console.log("Login Error: ", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const logout = (req, res) => {
  try {
    // Clear the authToken cookie
    res.clearCookie("authToken", {
      httpOnly: true, // Ensures the cookie can only be accessed by the server
      sameSite: "strict", // Helps prevent CSRF attacks
    });

    // Respond to the user
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.log("Logout Error: ", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export { register, login, logout };
