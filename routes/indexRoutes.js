const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/IndexController')

// showing page or Form routes
router.get('/', (req, res) => {
    res.render('jobseeker/')
})

router.get('/login', (req, res) => {
    res.render('jobseeker/authentication/login', {errMsg: null})
})

router.get('/register', (req, res) => {
    res.render('jobseeker/authentication/register', {errMsg: null})
})

// handling post request
router.post('/register', IndexController.register)
router.post('/login', IndexController.login)

module.exports = router