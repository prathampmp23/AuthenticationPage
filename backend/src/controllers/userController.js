import { User } from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ====================== SIGNUP ====================== //
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }
  console.log("Received registration");

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Registered" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

// ====================== LOGIN ====================== //
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide login details" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    // Generate JWT token (use email as payload)
    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token, message: "Login successful" });
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

export { login, signup };
