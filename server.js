const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

// CONTROLLERS
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const app = express();
app.use(cors())
app.use(bodyParser.json());

// Heroku
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


app.get('/', (req, res) => {
    res.json("Started")
});


// app.post('/signin', (req, res) => {
//     signin.handleSignin(req, res, db, bcrypt)
// })
app.post('/signin', signin.handleSignin(db, bcrypt))


app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})