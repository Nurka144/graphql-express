const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    create_user: {type: String},
    create_date: {type: Date, default: Date.now()},
    update_user: {type: String, default: null},
    update_date: {type: Number, default: null},
    is_active: {type: Number, default: 1}
});

module.exports = new mongoose.model('posts', postSchema);
