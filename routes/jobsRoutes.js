const express = require('express')
const router = express.Router()
const {Job, Company, Apply, Category} = require('../models/index')
const helper = require('../helpers/helper')
const isUserLogin = helper.isUserLogin
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
router.get('/', (req, res) => {
        
        if (req.query.category) {
            Job.findAll({
                include: [{
                    model: Company    
                }],
                where: {
                    CategoryId: req.query.category
                 }
            })
            .then((jobs) => {
                Category.findAll()
                    .then((categories) => {
                        res.render('jobseeker/job/', {user: req.session.user, jobs, categories})
                    })           
            })
            .catch(err => {
                res.send(err)
            })
        } else {
            Job.findAll({
                include: [{
                    model: Company    
                }]
            })
            .then((jobs) => {
                Category.findAll()
                    .then((categories) => {
                        res.render('jobseeker/job/', {user: req.session.user, jobs, categories})
                    })           
            })
            .catch(err => {
                res.send(err)
            })
        }
     
})

router.get('/apply/:id', (req, res) => {
    res.send('')
})



router.get('/:id/apply', isUserLogin, (req, res) => {
    res.render('jobseeker/jobs/apply',{user: req.session.user, jobId: req.params.id})
})

router.post('/:id/apply', isUserLogin, (req, res) => {
    // res.send(req.params.id)
    console.log(req.session.user)
    Apply.create({
        CustomerId: req.session.user.id,
        JobId: req.params.id,
        summary: req.body.summary,
        status: 'pending'
    })
    .then(() => {
        res.redirect('/jobs/lists')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/lists', isUserLogin, (req, res) => {
    Apply.findAll({
        include: [{
            model: Job,
            include: [{
                model: Company
            }]
        }],
        where: {
            CustomerId: req.params = req.session.user.id
        }
    })
        .then((data) => {
            // res.send(data)
            res.render('jobseeker/jobs/list', {user: req.session.user, data})
        })
    
})

router.get('/:id', (req, res) => {
    Job.findById(req.params.id, {
        include: [{
            model: Company
        }]
    })
        .then(job => {
            res.render('jobseeker/jobs/job-detail', {user: req.session.user, job})
        })
        .catch(err => {
            res.send(err)
        })
    
})




module.exports = router