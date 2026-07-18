import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken";
import { sendRegistrationEmail } from "../middlewares/email.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETPIN, { expiresIn: "1d" });
};

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // required for SameSite=None
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

// @route POST /api/v1/register
// Matches Signup.jsx fields exactly, including optional avatar upload
export const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      address,
      phone,
      className,
      dob,
      gender,
      username,
      password,
    } = req.body;

    // Required fields (matches what Signup.jsx actually needs to create an account)
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({
        message:
          "firstName, lastName, email, username and password are required",
      });
    }

    const existingStudent = await Student.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingStudent) {
      const field =
        existingStudent.email === email.toLowerCase() ? "Email" : "Username";
      return res.status(400).json({ message: `${field} already registered` });
    }

    let avatarPath = "";

    // Handle optional avatar upload (Signup.jsx has an <input type="file" id="avatar" />)
    if (req.files && req.files.avatar) {
      const avatar = req.files.avatar;

      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(avatar.mimetype)) {
        return res.status(400).json({
          message: "Invalid avatar type. Only JPEG, PNG, and JPG are allowed.",
        });
      }

      const filename = `${Date.now()}-${avatar.name}`;
      const uploadFilePath = `./uploads/${filename}`;
      await avatar.mv(uploadFilePath);
      avatarPath = uploadFilePath;
    }

    const newStudent = await Student.create({
      firstName,
      middleName,
      lastName,
      email,
      address,
      phone,
      className,
      dob: dob || undefined,
      gender,
      username,
      password,
      avatar: avatarPath,
    });

    // Send confirmation email, but don't let a failed email crash registration
    try {
      await sendRegistrationEmail(newStudent);
    } catch (emailError) {
      console.error("Registration email failed (non-critical):", emailError.message);
    }

    return res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @route POST /api/v1/login
// Matches Signin.jsx which sends { username, password }
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await Student.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @route POST /api/v1/logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "Logout successful" });
};

// @route GET /api/v1/users (protected)
export const getAllUsers = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: "All students fetched", students });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @route GET /api/v1/me (protected) — get the logged-in user's own profile
export const getCurrentUser = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Current user fetched", student });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};