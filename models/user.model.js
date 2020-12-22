const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    credentials: {type: String, default: null},
    create_by: {type: Date, default: Date.now()},
    update_by: {type: Date, default: null},
    is_active: {type: Number, default: 1}
});

module.exports = new mongoose.model('users', userSchema);