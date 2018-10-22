const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')

const indexRoutes = require('./routes/indexRoutes')
const jobsRoutes = require('./routes/jobsRoutes')
const profileRoutes = require('./routes/profileRoutes')
const companyRoutes = require('./routes/companyRoutes')

app.set('view engine', 'ejs')
app.use(session({
    secret: "sosecret",
    saveUninitialized: false,
    resave: false
}));  

app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', indexRoutes)
app.use('/profile', profileRoutes)
app.use('/jobs', jobsRoutes)
app.use('/companies', companyRoutes)


const port = 8000
app.listen(port, () => {
    console.log(`application running on port ${port}`)
    // console.log(path)
})
