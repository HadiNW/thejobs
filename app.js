const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')))
// app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('jobseeker/')
})

app.get('/job-search', (req, res) => {
    res.render('jobseeker/job/')
})

app.get('/profile', (req, res) => {
    res.render('jobseeker/profile/')
})

app.get('/profile/update', (req, res) => {
    res.render('jobseeker/profile/update')
})

app.get('/companies',(req, res) => {
    res.render('jobseeker/companies/')
})

const port = 8000
app.listen(port, () => {
    console.log(`application running on port ${port}`)
    // console.log(path)
})
