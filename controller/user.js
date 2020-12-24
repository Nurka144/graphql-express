const log = require('../config/winston');
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.create = async function create(bind) {
    try {
        const {login, password} = bind;
        const findLogin = await User.find({login})
        if (findLogin.length != 0) {
            throw 'Пользователь с таким Login занят'
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            login,
            password: hashPassword
        })
        const newUser = await user.save();
        return newUser
    } catch (error) {
        log.error(error);
        throw new Error(error);
    }
}

module.exports.login = async function login(bind) {
    try {
        const {login, password} = bind;
        const {[0]: findUser} = await User.find({login});
        if (!findUser) {
            throw 'Некорректные данные'
        }
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword) {
            throw 'Некорректные данные'
        }
        const token = await jwt.sign({data: findUser}, 'secretlogin', {expiresIn: '1h'});
        await User.updateOne({_id: findUser._id}, {$set: {credentials: token}});
        return {token: token};
    } catch (error) {
        log.error(error);
        throw new Error(error);
    }
}