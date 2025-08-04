"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateRegistration = void 0;
const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
    // Name validation - only letters and spaces
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
        return res.status(400).json({ success: false, message: 'Name should contain only letters and spaces' });
    }
    if (name.trim().length < 2) {
        return res.status(400).json({ success: false, message: 'Name must be at least 2 characters' });
    }
    // Email validation
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }
    // Password validation
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Password is required' });
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }
    if (!/[a-z]/.test(password)) {
        return res.status(400).json({ success: false, message: 'Password must contain at least one lowercase letter' });
    }
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ success: false, message: 'Password must contain at least one uppercase letter' });
    }
    if (!/[0-9]/.test(password)) {
        return res.status(400).json({ success: false, message: 'Password must contain at least one number' });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).json({ success: false, message: 'Password must contain at least one special character' });
    }
    next();
};
exports.validateRegistration = validateRegistration;
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ success: false, message: 'Password is required' });
    }
    next();
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=validation.js.map