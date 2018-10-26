const express = require('express')
const router = express.Router()
const {Company, Customer, Category, Job, Apply, sequelize} = require('../models/index')
const crypto = require('crypto');
const helper = require('../helpers/helper');
// const sequelize = Models.sequelize

router.get('/', (req, res) => {
      // console.log(req.session.companyUser)
  
      let query = `SELECT
      (
         SELECT COUNT(*) AS "total" FROM "Applies", "Companies", "Jobs"
         WHERE "Applies"."JobId" = "Jobs"."id" AND "Companies"."id" = "Jobs"."CompanyId" AND "Companies"."id" = ${req.session.companyUser.id}
     ) As "total",
     (
         SELECT COUNT(*) AS "total" FROM "Applies", "Companies", "Jobs"
         WHERE "Applies"."JobId" = "Jobs"."id" AND "Companies"."id" = "Jobs"."CompanyId" AND "status" = 'pending' AND "Companies"."id" = ${req.session.companyUser.id}
     ) As "pending",
     (
         SELECT COUNT(*) AS "total" FROM "Applies", "Companies", "Jobs"
         WHERE "Applies"."JobId" = "Jobs"."id" AND "Companies"."id" = "Jobs"."CompanyId" AND "status" = 'interview' AND "Companies"."id" =${req.session.companyUser.id}
     ) As "interview",
     (
         SELECT COUNT(*) AS "total" FROM "Applies", "Companies", "Jobs"
         WHERE "Applies"."JobId" = "Jobs"."id" AND "Companies"."id" = "Jobs"."CompanyId" AND "status" = 'employed' AND "Companies"."id" = ${req.session.companyUser.id}
     ) As "employed",
     (
        SELECT COUNT(*) AS "total" FROM "Applies", "Companies", "Jobs"
        WHERE "Applies"."JobId" = "Jobs"."id" AND "Companies"."id" = "Jobs"."CompanyId" AND "status" = 'rejected' AND "Companies"."id" = ${req.session.companyUser.id}
    ) As "rejected"
`
      sequelize.query(`${query}`, { raw: true}).spread(data => {
        //   res.send(data)
          res.render('companies/dashboard', {data: data, company: req.session.companyUser})
       })     
      .catch(err => {
          res.send(err)
          console.log(err)
      })        
})

router.get('/profile', (req, res) => {
    Company.findById(req.session.companyUser.id)
        .then(data => {
            res.render('companies/profile', {company: data})
        })
        .catch(err => {
            res.send(err)
        })
    
})


router.get('/profile/update', (req, res) => {
    Company.findById(req.session.companyUser.id)
        .then(data => {
            res.render('companies/update', {company: data})
        })
        .catch(err => {
            res.send(err)
        })
})
router.post('/profile/update', (req, res) => {
    Company.update({
        name: req.body.name,
        headline: req.body.headline,
        description: req.body.description,
        location: req.body.location,
        foundedOn: req.body.foundedOn,
        phone: req.body.phone,
        email: req.body.email
    }, {
        where: {
            id: req.session.companyUser.id
        }
    })
    .then(() => {
        res.redirect('/company/dashboard/profile')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/jobs/post', (req, res) => {
    Company.findById(req.session.companyUser.id)
        .then(data => {
            Category.findAll()
                .then(category => {
                    res.render('companies/postjob', {company: data, category})
                })           
        })
        .catch(err => {
            console.log(err)
            res.send('err')
        })
})

router.post('/jobs/post', (req, res) => {
    Job.create({
        name: req.body.name,
        salary: req.body.salary,
        CategoryId: req.body.category,
        academic: req.body.academic,
        description: req.body.description,
        location: req.body.location,
        isOpen: true,
        CompanyId: req.session.companyUser.id
    })
    .then(() => {
        res.redirect('/company/dashboard/jobs')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/jobs', (req, res) => {
    Job.findAll({
        where: {
            CompanyId: req.session.companyUser.id
        }
    })
    .then((job) => {
        // res.send(job)
        res.render('companies/job-list', {company: req.session.companyUser,job })
    })
    .catch(err => {
        res.send(err)
    })   
})
//get job -> customer -> applies where : jobId
router.get('/jobs/:id', (req, res) => {
   Apply.findAll({
       include: [Customer, Job],
       where: {
           JobId: req.params.id
       }
   })
    .then((apps) => {
        
        // res.send(apps)
        res.render('companies/applicants', {company: req.session.companyUser, apps: apps })
    })
    .catch(err => {
        res.send(err)
    })
})


router.get('/jobs/:id/reject', (req, res) => {
    Apply.update({
        status: 'rejected'
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/company/dashboard/jobs')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/jobs/:id/interview', (req, res) => {
    Apply.update({
        status: 'interview'
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/company/dashboard/jobs')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/jobs/:id/employed', (req, res) => {
    Apply.update({
        status: 'employed'
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/company/dashboard/jobs')
    })
    .catch(err => {
        res.send(err)
    })
})
module.exports = router