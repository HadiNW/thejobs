const express = require('express')
const router = express.Router()

router.get('/',(req, res) => {
    res.render('jobseeker/companies/')
})

module.exports = router