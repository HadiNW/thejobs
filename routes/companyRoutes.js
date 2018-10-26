const express = require('express')
const router = express.Router()
const {Company, Customer} = require('../models/index')
const crypto = require('crypto');
const helper = require('../helpers/helper');


router.get('/',(req, res) => {
    res.render('jobseeker/companies/', {user: req.session.user})
})



router.get('/login', (req, res) => {
    res.render('companies/login', {errMsg: null})
})

router.get('/register', (req, res) => {
    res.render('companies/register', {errMsg: null})
})

router.post('/login', (req, res) => {
        console.log('BBB')
        Company.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        .then(company => {   
            if (company) {            
                req.session.companyUser = company
                // console.log(req.session.companyUser, 'sessss')
                res.redirect('/company/dashboard')
             } else {
                res.render('jobseeker/authentication/login', {errMsg: 'No user found'})
            }        
        })
        .catch(err => {
            res.send(err)
        })

})
router.post('/register', (req, res) => {
    // res.send(req.body)
    if (req.body.password !== req.body.password1) {
        res.render('companies/register', {errMsg:'password dosen\'t match'})
    } else {
        Company.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })    
        .then(() => {
            res.redirect('/company/login')
        })  
        .catch((err) => {
            res.render('companies/register', {errMsg: err.message})
        })   
    }      
})

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/')
      })
})

module.exports = router