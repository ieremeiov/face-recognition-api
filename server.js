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

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'sargeras',
        database: 'smartbrain'
    }
});

const database = {
    users: [
        {
            id: '123',
            name: 'Cip',
            email: 'cip@gmail.com',
            password: 'qwqwqw',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Gigi',
            email: 'gigi@gmail.com',
            password: 'qwqwqw',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'cip@gmail.com'
        },
        {
            id: '988',
            hash: '',
            email: 'gigi@gmail.com',
        }
    ]
}

app.listen(3000, () => {
    console.log('app is running on port 3000');
});


app.get('/', (req, res) => {
    res.send(database.users)
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