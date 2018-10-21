const Model = require('../models/index')
class IndexController {
    
    static register(req, res) {   
        if (req.body.password !== req.body.password1) {
            res.render('jobseeker/authentication/register', {errMsg:'password dosen\'t match'})
        } else {
            Model.JobSeeker.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })    
            .then(() => {
                res.redirect('/login')
            })  
            .catch((err) => {
                res.render('jobseeker/authentication/register', {errMsg: err.message})
                console.log(typeof err.message)
            })   
        }       
    }

    static login(req, res) {
        Model.JobSeeker.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        .then((user) => {
            if (!user) {
                res.render('jobseeker/authentication/login', {errMsg: 'No user found'})
            } else {
                res.send('ada user')
            }
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = IndexController