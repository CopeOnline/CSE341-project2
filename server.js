const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongodb = require('./data/database')
const session = require("express-session")
//const pool = require('./data/database/')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const cors = require('cors')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')

const port = process.env.PORT || 3000


// Static folder
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', './layouts/layout') // not at views root

app.use(bodyParser.json())
app.use(session({
  secret: "secret",
  resave: false , 
  saveUninitialized: true ,
}))
  // This is the basic express session({..}) initialization
  .use(passport.initialize())
  // init passport on every route call
  .use(passport.session())
  // allow passport to use "express-session"
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  next()
})
  .use(cors({ methods: [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS' ]}))
  .use(cors({ origin: "*"}))
  .use('/', require('./routes'))

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  //User.findOrCreate({ githubId: profile.id}, function (err, user){
    return done(null, profile);
  //});
}
))

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` :  res.render("/login", {title: "Login"}) 
)})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  })

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
})

mongodb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port, () => { console.log(`Database is listening and node Running on port ${port}`) })
  }
})
