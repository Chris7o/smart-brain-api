const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgresql-solid-43915',
    password : 'olivia7',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) =>{res.send('it is working!');})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res ) => { register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})
// const DATABASE_URL = process.env.DATABASE_URL
app.listen(process.env.PORT || 3000, ()=> {
console.log(`app is returning on port ${process.env.PORT }`);
})
