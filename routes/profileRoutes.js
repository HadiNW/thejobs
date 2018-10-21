const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('jobseeker/profile/')
})

router.get('/update', (req, res) => {
    res.render('jobseeker/profile/update')
})
module.exports = router