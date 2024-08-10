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
    visitHistory: [{timestamp:{type: Number}}]

},{timestamps: true})

const shortUrlModel = mongoose.model('url', ShortUrlSchema);

module.exports = shortUrlModel;