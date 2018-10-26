const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const flash = require('req-flash');

const indexRoutes = require('./routes/indexRoutes')
const jobsRoutes = require('./routes/jobsRoutes')
const profileRoutes = require('./routes/profileRoutes')
const companyRoutes = require('./routes/companyRoutes')
const helper = require('./helpers/helper')
const UserLogin = helper.isUserLogin
const CompanyLogin = helper.isCompanyLogin
const dashboardRoutes = require('./routes/dashboard')



app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false
  })) 

app.use(flash());
app.use(function(req, res, next){
    res.locals.success_messages = req.flash('succMsg');
    res.locals.error_messages = req.flash('errMsg');
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', indexRoutes)
app.use('/profile', UserLogin ,profileRoutes)
app.use('/jobs', jobsRoutes)
app.use('/company', companyRoutes)
app.use('/company/dashboard', CompanyLogin, dashboardRoutes)


const port = 8000
app.listen(port, () => {
    console.log(`application running on port ${port}`)
    // console.log(path)
})
