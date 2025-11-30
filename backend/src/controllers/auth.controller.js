const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { registerSchema, loginSchema } = require('../utils/validator');

exports.register = async (req, res, next) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const { name, email, password } = value;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        const token = generateToken(user);

        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const { email, password } = value;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
    } catch (err) {
        next(err);
    }
};


// Update profile (name + email)
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        if (!name || !email)
            return res.status(400).json({ message: "Name and email are required" });

        const emailTaken = await User.findOne({ email, _id: { $ne: req.user._id } });
        if (emailTaken)
            return res.status(400).json({ message: "Email already in use" });

        req.user.name = name;
        req.user.email = email;
        await req.user.save();

        res.json({
            message: "Profile updated successfully",
            user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role }
        });
    } catch (err) {
        next(err);
    }
};

// Change password
exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword)
            return res.status(400).json({ message: "Both passwords are required" });

        const user = await User.findById(req.user._id);
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) return res.status(400).json({ message: "Current password incorrect" });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        next(err);
    }
};
