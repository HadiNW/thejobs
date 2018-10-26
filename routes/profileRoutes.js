const express = require('express')
const router = express.Router()
const {Customer} = require('../models/index')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: './public/uploads/photos',
    filename: function(req, file, cb) {
      let extArray = file.mimetype.split('/')
      let extension = extArray[extArray.length - 1]
      cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
    }
  })

  const uploads = multer({storage})

router.get('/', (req, res) => {
    Customer.findOne({
        where: {
            id: req.session.user.id
        }
    })
    .then(customer => {
        res.render('jobseeker/profile/', {
          user: req.session.user,
          customer: customer
        })
  })
  .catch(err => {
      res.send(err)
  })   
})

router.get('/update', (req, res) => {
    Customer.findOne({
        where: {
            id: req.session.user.id
        }
    })
    .then(customer => {
          res.render('jobseeker/profile/update', {
            user: req.session.user,
            customer: customer
          })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/update', uploads.single('image'), (req, res) => {
    console.log(req.body.name)
    console.log(req.file)
    Customer.update({
        name: req.body.name,
        headline: req.body.headline,
        // email: req.body.email,
        phone: req.body.phone,
        photo: req.file.filename,
        description: req.body.description,
        location: req.body.location,
        // birthdate: req.body.birthdate
     }, {
         where: {
             id: req.session.user.id
         }
     })
     .then(() => {
         res.redirect('/profile')
     })
     .catch(err => {
         res.send(err)
     })
})
  
module.exports = router