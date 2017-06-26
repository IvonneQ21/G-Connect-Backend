'user strict';

const bcrypt   = require('bcrypt-as-promised');
const express = require('express');
const humps   = require('humps');
const jwt     = require('jsonwebtoken');
const knex    = require('../knex');

const {camelizeKeys, decamelizeKeys} = require('humps');

const router  = express.Router();
const cookieParser =  require('cookie-parser');
const dotenv = require('dotenv').config();
const cert = process.env.JTW_KEY;

const { createHttpError } = require('../utils');

router.get('/users', (req, res, next) => {
  knex('users')
  .orderBy('user_name', 'desc')
  .then((user) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(humps.camelizeKeys(user));
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/users/:id', (req, res) => {
  let userId = req.params.id;
  console.log('user', userId);
  knex('users')
  .where('id', userId)
  .then(user => {
    if(!user){
      res.status(404).json("User Not Found");
    } else {
      res.set('Content-Type', 'application/json');
      res.send(humps.camelizeKeys(user)[0]);
    }
  })
  .catch(err => {
    console.err(err);
  })
})
router.get('users/:id/skills', (req, res) => {
 let userId = req.params.id;
 knex('skills')
 .where('user_id', userId)
 .then(userSkills => {
   console.log("the userSKILLS", userSkills);
   if(!userSkills){
     res.status(404).json('SKILLS NOT FOUND')
   }else {
     res.set('Content-Type', 'application/json')
     res.send(humps.camelizeKeys(userSkills));
   }
 })
 .catch(err => {
   res.send(err);
 })
})

// //creating new users:
router.post('/users', (req, res) => {
  const { email, password } = req.body;
  if(!email || !email.trim()){
  res.status(400).json('Email must not be Blank');
  }
  if(!password || password.length < 8){
  res.status(404).json('Password must be at least 8 characters long')
  }
  knex('users')
  .where('email', email)
  .first()
  .then(user => {
    if(user) {
      throw createHttpError(400, 'Email already exits');
    }
    return bcrypt.hash(req.body.password, 12)
  })
  .then(hashed_password => {
    console.log(req.body.email, hashed_password);
    // const userToInsert = { first_name, last_name, user_name, email, hashed_password, linkedIn_url, gitHub_url, twitter_url, user}
    return knex('users')
    .insert({
      first_name: req.body.first_name,
      last_name:req.body.last_name,
      user_name:req.body.user_name,
      email: req.body.email,
      hashed_password: hashed_password,
      linkedIn_url:req.body.linkedIn_url,
      gitHub_url:req.body.gitHub_url,
      twitter_url:req.body.twitter_url,
      user_type_id: req.body.user_types_id
    }, '*')
  })
  .then(user => {
    console.log("USER", user);
    const newUser = camelizeKeys(user[0]);

    // const claim = {userId:user.id};
    // const token = jwt.sign(claim, process.env.JTW_KEY, {
    //   expiresIn: '7 days'
    // })
    // res.cookie('token', token, {
    //   httpOnly:true,
    //   expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // seven days
    //   secure: router.get('env') === 'production'
    // });
    console.log("the newUSER", newUser);
    delete newUser.hashed_password;
    res.send(user);
    // return knex("users_type").where("user_type.id", req.body.user_type).select('id').first();
  })
  .catch(err => {
    if (err.statusCode = 400) {
      res.status(400).json({ errorMessage: err.message });
      return;
    }
    next(err);
  })
})



router.delete('/users/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

 if(Number.isNaN(id)){
   return next();
 }

 // let usertoremove;

  knex('users')
  .where('id', id)
  .first()
  .then((user) => {
    console.log("the user", req.params.id);
    if(!user){
      throw createHttpError(404, 'Not found');
      // return next()
    }
    // const usertoremove = camelizeKeys(user);
    return knex('users')
    .del()
    .where('id', id)
    .returning('*')
  })
  .then((user)=> {
    console.log("the usre in delete", typeof user[0]);
    // delete user[0].id;
    res.send(user[0]);
  })
  .catch( err => {
    next(err);
  });
});

module.exports = router;
