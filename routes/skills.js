'use strict'
const express = require('express');
const knex = require('../knex');
const router = express.Router();
const humps = require('humps');

router.get('/skills', (req, res) => {
  knex('skills')
  .orderBy('skill_name', 'asc')
  .then(skill => {
    res.setHeader('Content-Type', 'application/json')
    res.send(humps.camelizeKeys(skill));
  })
  .catch(err => {
    res.send(err);
  })
  });

  router.get('/skills/:id', (req, res) => {
    let skillId = req.params.id;
    knex('skills')
    .where('id', skillId)
    .then(skill => {
      if(!skill){
        res.status(404).json('Skill Not Found')
      } else {
        res.set('Content-Type', 'application/json')
        res.send(humps.camelizeKeys(skill)[0]);
      }
    })
    .catch( err => {
      res.send(err);
    })
  })

  // router.get()

module.exports = router;
