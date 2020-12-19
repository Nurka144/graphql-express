const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    complete: {type: Boolean},
    date_by: {type: Date, default: Date.now()}
});

module.exports = new mongoose.model('todoSchema', todoSchema);