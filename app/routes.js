const express = require('express');
const router = express.Router();
const auth = require('./authorizations/auth');

const usersCtrl = require('./controllers/users');
// const campusesCtrl = require('.controllers/campuses');


router.post('/login', auth.login)
      .get('/users', usersCtrl.get)
      .get('/users/:id', usersCtrl.byid)
      .delete('/users/:id', usersCtrl.delete)
