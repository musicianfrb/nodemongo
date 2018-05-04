const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('../users')

const user = new User();
// utils
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES FOR USERS
app.post('/crud/users/create', user.create);
app.get('/crud/users', user.read);
app.get('/crud/users/:id', user.readOne);
app.put('/crud/users/update/:id', user.update);



module.exports = app