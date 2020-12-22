const log = require('../config/winston');
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

module.exports.create = async function create(bind) {
    try {
        const {login, password} = bind;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            login,
            password: hashPassword
        })
        const newUser = await user.save();
        return newUser
    } catch (error) {
        log.error(error);
    }
}

module.exports.login = async function login(bind) {
    try {
        
    } catch (error) {
        log.error(error);
    }
}