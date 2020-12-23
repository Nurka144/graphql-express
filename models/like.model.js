const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post_id: {type: Number, required: true},
    user_id: {type: Number, required: true},
    create_user: {type: String},
    create_date: {type: Date, default: Date.now()},
    update_user: {type: String, default: null},
    update_date: {type: Number, default: null},
    is_active: {type: Number, default: 1}
});

module.exports = new mongoose.model('likes', likeSchema);
