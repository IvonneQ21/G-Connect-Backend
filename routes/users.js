'user strict';
 const express = require('express');
 const knex = require('../knex');
 const router = express.Router();
 const humps = require('humps');


const bcryt = require('bcrypt');

const jwt = require('jsonwebtoken');
const cookieParser =  require('cookie-parser');
const dotenv = require('dotenv').config();
// const {camelizeKeys, decamelizeKeys} = require('humps');
router.get('/users', (req, res, next) => {
  knex('users')
  .orderBy('user_name', 'desc')
  .then((user) =>{
    res.setHeader('Content-Type', 'application/json')
    res.send(humps.camelizeKeys(user));
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/users/:id', (req, res,next) => {
  let userId = req.params.id;
  console.log('iser', userId);
  knex('users')
  .where('id', userId)
  .then(user => {
    if(!user){
      res.status(404).json("User Not Found");

    }else{
      res.set('Content-Type', 'application/json');
      res.send(humps.camelizeKeys(user)[0]);
    }
  })
  .catch(err => {
    console.err(err);
  })
})

module.exports = router;
