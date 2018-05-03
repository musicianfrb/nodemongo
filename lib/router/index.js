const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const User = require('../users')

const user = new User();
// utils
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
app.post('/crud/users/create', user.create);



module.exports = app