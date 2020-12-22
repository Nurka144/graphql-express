const log = require('../config/winston');
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

module.exports.create = async function create(bind) {
    try {
        throw "acasc"
    } catch (error) {
        log.error(error);
        throw new Error(error)
    }
}

module.exports.login = async function login(bind) {
    try {
        console.log(bind)
    } catch (error) {
        log.error(error);
    }
}