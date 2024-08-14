const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectURL:{
        type: String,
        require: true
    },
    visitHistory: [{timestamp:{type: Number}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "shorturl-users"
    }

},{timestamps: true})

const shortUrlModel = mongoose.model('urls', ShortUrlSchema);

module.exports = shortUrlModel;