const crypto = require('crypto');

const hashPassword = async(password) => {
    let salt = crypto.randomBytes(16).toString('hex')
    const hash = await crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return { hash, salt }
}

const comparePassword = async(password, hashed, salt) => {
    const hash = await crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    return hash === hashed
}

module.exports = { hashPassword, comparePassword }