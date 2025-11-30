const Post = require('../models/Post');
const { postCreateSchema } = require('../utils/validator');

// Create post
// Create post
exports.createPost = async (req, res, next) => {
    try {
        const { error, value } = postCreateSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.message });

        const post = await Post.create({
            ...value,
            description: value.content, // final mapping
            author: req.user._id,
        });

        res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};


// Get all posts (admin sees all, user only own)
exports.getPosts = async (req, res, next) => {
    try {
        const filter = req.user.role === 'admin' ? {} : { author: req.user._id };
        const posts = await Post.find(filter)
            .populate('author', 'name email role')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        next(err);
    }
};

// Get single post
exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email role');

        if (!post) return res.status(404).json({ message: 'Not found' });

        if (req.user.role !== 'admin' && post.author._id.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Forbidden' });

        res.json(post);
    } catch (err) {
        next(err);
    }
};

// Update post (user only their own, admin any)
exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Not found" });

        if (req.user.role !== "admin" && post.author.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Forbidden" });

        const allowedFields = ["title", "description", "platform", "status", "scheduledAt", "metadata"];

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                post[field] = req.body[field];
            }
        });

        await post.save();
        res.json(post);
    } catch (err) {
        next(err);
    }
};


// Delete post
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Not found' });

        if (req.user.role !== 'admin' && post.author.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Forbidden' });

        await post.deleteOne();
        res.json({ message: 'Deleted' });
    } catch (err) {
        next(err);
    }
};


exports.getStats = async (req, res, next) => {
    try {
        const filter = req.user.role === "admin" ? {} : { author: req.user._id };
        const posts = await Post.find(filter);

        const totals = {
            total: posts.length,
            scheduled: posts.filter(p => p.status === "scheduled").length,
            posted: posts.filter(p => p.status === "posted").length,
        };

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const byDay = days.map(day => ({
            day,
            count: posts.filter(p => p.createdAt && days[new Date(p.createdAt).getDay()] === day).length
        }));

        const status = {};
        posts.forEach(p => status[p.status] = (status[p.status] || 0) + 1);

        return res.json({ totals, byDay, status });
    } catch (err) {
        next(err);
    }
};
