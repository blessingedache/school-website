const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || process.env.SECRETPIN || "change-this-secret";

const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, default: "" },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  className: { type: String, default: "" },
  dob: { type: String, default: "" },
  gender: { type: String, default: "" },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

function sanitizeUser(user) {
  const { password, ...safeUser } = user.toObject ? user.toObject() : user;
  return safeUser;
}

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.post("/api/auth/signup", async (req, res) => {
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

  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide first name, last name, email, username and password.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      middleName: middleName || "",
      lastName,
      email: email.toLowerCase(),
      address: address || "",
      phone: phone || "",
      className: className || "",
      dob: dob || "",
      gender: gender || "",
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    const token = signToken(newUser);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token,
      user: sanitizeUser(newUser),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signup failed.",
      error: error.message,
    });
  }
});

app.post("/api/auth/signin", async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide your username/email and password.",
    });
  }

  try {
    const normalizedIdentifier = identifier.toLowerCase();

    const user = await User.findOne({
      $or: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password.",
      });
    }

    const token = signToken(user);

    return res.json({
      success: true,
      message: "Login successful.",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Signin failed.",
      error: error.message,
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

startServer();