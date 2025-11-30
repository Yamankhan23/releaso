const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    platform: { type: String, default: 'generic' },
    status: { type: String, enum: ['draft', 'scheduled', 'posted'], default: 'draft' },
    scheduledAt: { type: Date },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    metadata: { type: Object } // store images, hashtags, videoId, etc.
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
