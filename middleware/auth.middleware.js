const log = require('../config/winston');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken')

function auth(token) {
    return new Promise(async (resolve, reject) => {
        try {
            const {[0]: findUser} = await User.find({credentials: token});
            let {data: decodedToken} = await jwt.verify(token, 'secretlogin')
            if (findUser && findUser._id == decodedToken._id) {
                resolve({
                    login: findUser.login,
                    id: findUser._id
                })
            } else {
                reject('API KEY не найден')
            }
        } catch (error) {
            log.error('Error in middleware -> ', error);
        }
    })
}

module.exports.auth = auth;