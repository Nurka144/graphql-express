const log = require('../config/winston');
const Post = require('../models/post.model');


module.exports.create = async function create(bind) {
    try {
        
    } catch (error) {
        log.error(error);
        throw new Error(error);
    }
}