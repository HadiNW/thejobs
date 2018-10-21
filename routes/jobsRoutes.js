const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('jobseeker/job/')
})

router.get('/:id', (req, res) => {
    res.render('jobseeker/jobs/job-detail')
})

module.exports = router