import User from "../models/User.js"
import { generateToken } from "../utils/generateToken.js"
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json({ message: "User doesn't exisits" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })
        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
    } catch (error) {
        return res.status(500).json({ message: "Login Failed", error: error.message })
    }
}
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User Already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashPassword
        })
        const token = generateToken(user._id)
        res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(201)
            .json({
                message: "User registered successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
}
export const getMe = async (req, res) => {
    res.status(200).json({
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
        },
    });
};
export const logout = async (req, res) => {
    res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "lax",
            secure:
                process.env.NODE_ENV ===
                "production",
        })
        .status(200)
        .json({
            message:
                "Logged out successfully",
        });
};