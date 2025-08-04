"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_auth_library_1 = require("google-auth-library");
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../utils/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Register endpoint
router.post('/register', validation_1.validateRegistration, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }
        // Hash password
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        // Create new user
        const user = new User_1.default({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });
        await user.save();
        // Generate token
        const token = (0, auth_1.generateToken)(user._id.toString());
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
// Login endpoint
router.post('/login', validation_1.validateLogin, async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User_1.default.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Check if user has a password (not Google-only user)
        if (!user.password) {
            return res.status(400).json({
                success: false,
                message: 'Please sign in with Google'
            });
        }
        // Verify password
        const isPasswordValid = await (0, auth_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Generate token
        const token = (0, auth_1.generateToken)(user._id.toString());
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
// Google OAuth endpoint
router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Google token is required'
            });
        }
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Google token'
            });
        }
        const { sub: googleId, email, name } = payload;
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: 'Unable to get user information from Google'
            });
        }
        // Check if user exists
        let user = await User_1.default.findOne({
            $or: [
                { email: email.toLowerCase() },
                { googleId }
            ]
        });
        if (user) {
            // Update Google ID if user exists but doesn't have it
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        }
        else {
            // Create new user
            user = new User_1.default({
                name,
                email: email.toLowerCase(),
                googleId,
            });
            await user.save();
        }
        // Generate token
        const jwtToken = (0, auth_1.generateToken)(user._id.toString());
        res.json({
            success: true,
            message: 'Google authentication successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token: jwtToken,
        });
    }
    catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Google authentication failed'
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map