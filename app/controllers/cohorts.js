const knex    = require('../../config/knex');
const humps   = require('humps');
const {camelizeKeys, decamelizeKeys} = require('humps');

exports.get = function(req,res,next) {
  knex('cohorts')
  .orderBy('name', 'desc')
  .then((cohort) => {
    res.setHeader('Content-Type','application/json')
    res.send(humps.camelizeKeys(cohort));
  })
  .catch((err) => {
    res.send(err);
  });
};

exports.byid = function(req,res,next) {
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
};

exports.post = function(req,res,next) {
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
};

exports.delete = function(req,res,next) {

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
};
