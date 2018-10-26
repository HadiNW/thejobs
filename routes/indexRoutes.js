const express = require('express')
const router = express.Router()
const {Customer, Job, Company} = require('../models/index')
const crypto = require('crypto');
const helper = require('../helpers/helper');
const isCompanyLogin = helper.isCompanyLogin

router.get('/', (req, res) => {
    Job.findAll({
        include: [{
            model: Company            
        }],
        order: [
            ['createdAt', 'asc']
        ],
        limit: 5
    })
    .then((jobs) => {
        res.render('jobseeker/', {user: req.session.user, jobs})
    })
    .catch(err => {
        res.send(err)
    })
   
})

router.get('/login', (req, res) => {
    res.render('jobseeker/authentication/login', {errMsg: null})
})

router.get('/register', (req, res) => {
    res.render('jobseeker/authentication/register', {errMsg: null})
})

// handling post request
router.post('/register', (req, res) => {            
    if (req.body.password !== req.body.password1) {
        res.render('jobseeker/authentication/register', {errMsg:'password dosen\'t match'})
    } else {
        Customer.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })    
        .then(() => {
            res.redirect('/login')
        })  
        .catch((err) => {
            res.render('jobseeker/authentication/register', {errMsg: err.message})
        })   
    }       
})
router.post('/login', (req, res) => {
    Customer.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {       
        if (user) {
            const hashPassword =  helper.generateHash(req.body.password, user.salt)
            if (user.password === hashPassword) {
                req.session.user = user
                res.redirect('/profile')
            } else {
                res.render('jobseeker/authentication/login', {errMsg: 'Wrong password'})
            }
           
        } else {
            res.render('jobseeker/authentication/login', {errMsg: 'No user found'})
        }        
    })
    .catch(err => {
        res.send(err)
    })
    // .then(user => {
    //     console.log(user.password, '==')
    //     const hashPassword =  helper.generateHash(req.body.password, user.salt)
    //     console.log(user)
    //     if (!user) {
    //         console.log('======2')
    //         res.render('jobseeker/authentication/login', {errMsg: 'No user found'})
    //     } else {
    //         console.log('======3')
    //         req.session.user = user
    //         res.redirect('/profile')
    //     }
    // })
    
})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/')
      })
})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/')
      })
})


router.get('/company', (req, res) => {
    res.render('companies/', {company: null})
})
module.exports = router

