import express, { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User, { IUser } from '../models/User';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { validateRegistration, validateLogin } from '../middleware/validation';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register endpoint
router.post('/register', validateRegistration, async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();

    // Generate token
    const token = generateToken((user._id as any).toString());

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
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login endpoint
router.post('/login', validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
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
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken((user._id as any).toString());

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
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Google OAuth endpoint
router.post('/google', async (req: Request, res: Response) => {
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
    let user = await User.findOne({ 
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
    } else {
      // Create new user
      user = new User({
        name,
        email: email.toLowerCase(),
        googleId,
      });
      await user.save();
    }

    // Generate token
    const jwtToken = generateToken((user._id as any).toString());

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
  } catch (error: any) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Google authentication failed'
    });
  }
});

export default router;