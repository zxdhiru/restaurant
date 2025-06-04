import User from "./schema";
import { generateAuthToken } from "./utils";
import config from "../../config";
import { Request, Response } from "express";

// handleLogin
export async function handleLogin(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }
    const { accessToken, refreshToken } = generateAuthToken(user._id as string, user.username);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.environment === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.environment === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error: unknown) {
    console.error("Login error:", error);
    if (error instanceof Error) {
      res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message,
      });
    }
  }
}

// handleLogout
// handleRegister
// handleUpdateProfile
// handleDeleteAccount
// handleForgotPassword
// handleResetPassword
// handleGetProfile
// handleGetUsers
// handleGoogleLogin
