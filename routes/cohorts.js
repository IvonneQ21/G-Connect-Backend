'use strict';

const express  = require('express');
const knex = require('../knex');
const router = express.Router();
const humps = require('humps');

router.get('/cohorts',  (req, res) => {
  knex('cohorts')
  .orderBy('name', 'desc')
  .then((cohort) => {
    res.setHeader('Content-Type','application/json')
    res.send(humps.camelizeKeys(cohort));
  })
  .catch((err) => {
    res.send(err);
  });
});
router.get('/cohorts/:id', (req, res) => {
  let paramId = req.params.id;
  knex('cohorts')
  .where('id', paramId)
  .then(cohort => {
    if(!cohort){
      res.status(404).json('Cohort Not Found');
    } else {
      res.set('Content-Type', 'application/json');
      res.send(humps.camelizeKeys(cohort)[0]);
    }
  })
  .catch(err => {
    res.send(err);
  })
})

router.post('/cohorts', (req, res, next) => {
  knex('campuses')
  .where({
    // campus_city: req.body.campus_city,
    campus_name: req.body.campus_name // need to use this in the front end as campus location.
  }).first()
  .then(campus => {
    // console.log(campus.id)//helping identify the problem.
    return knex('cohorts').insert({
      name: req.body.name,
      graduation_date: req.body.graduation_date,
      campus_id: campus.id
    }, '*' )
  })
  .then(cohort => {
    if(!cohort) {
      return next();
    }
    res.set('Content-Type', 'application/json');
    res.send(humps.camelizeKeys(cohort)[0]);
  })
  .catch(err => {
    next(err);
  });
});
///NOTE: if user request to upate cohort an email should be
//sent to a superuser or Administrator
// NOTE: GOES here now need to know how implement it.
// router.put('/cohort/:id' (req, res, next) => {
//   knex('cohort')
//   .where('id', '=', req.params.id)
//   .first()
//   // .update('name', req.body.name);
// })
// /// if the user requests to update their cohort
//
// return knex('cohort')
// .update({
//   name: req.
// })

//NOTE: Only a super user can delete a cohort
//this needs to be given an authorizations part/
router.delete('/cohorts/:id', (req, res) => {

  let cohort;
  knex('cohorts')
  .where('id', req.params.id)
  .then(row => {
    console.log("the row to delete", req.params.id);
    if(!row){
      return next()
    }
    cohort = row;
    return knex('cohorts')
    .del()
    .where('id', req.params.id);
  })
  .then(() => {
    delete cohort[0].id;
    res.send(humps.camelizeKeys(cohort)[0]);
  })
  .catch( err => {
     res.send(err);
  });
});

module.exports = router;
