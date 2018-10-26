const express = require('express')
const app = express()
const crypto = require('crypto');
class Helper {

    static generateHash(password, salt) {
        const hash = crypto
               .createHmac('sha256', salt)
               .update(password)
               .digest('hex');
        return hash
    }

    static generateSalt() {
        return crypto.randomBytes(16).toString();
    }

    static isUserLogin(req, res, next) {
        if (!req.session.user) {
            const errMsg = 'You\'re not logged in'
            res.redirect('/login')
        } else {
            next()
        }         
    }

    static isCompanyLogin(req, res, next) {
        if (!req.session.companyUser) {
            res.redirect('/company/login')
        } else {
            next()
        }         
    }
}

module.exports = Helper