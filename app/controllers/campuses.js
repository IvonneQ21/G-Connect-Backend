const knex    = require('../../config/knex');
const humps   = require('humps');
const {camelizeKeys, decamelizeKeys} = require('humps');




exports.get = function(req,res,next) {
  knex('campuses')
  .orderBy('campus_name', 'asc')
  .then(campus => {
    console.log("this is the campus", campus);
    res.setHeader('Content-Type', 'application/json')
    res.send(humps.camelizeKeys(campus));
  })
  .catch(err => {
    res.send(err);
  });
};

exports.byid = function(req,res,next) {
  let campusId = req.params.id;
  knex('campuses')
  .where('id', campusId)
  .then(campus => {
    if(!campus){
      res.status(404).json('Campus Not Found')
    } else {
      res.set('Content-Type', 'application/json')
      res.send(humps.camelizeKeys(campus)[0]);
    }
  })
  .catch( err => {
    res.send(err);
  })
};

exports.cohorts = function(req,res,next) {
  let campusId = req.params.id;
  console.log("the passeinParams", req.params.id);
  knex('cohorts')
  .where('campus_id', campusId)
  .then(cohorts => {
    console.log("these are the resulting cohorts", cohorts);
    if(!cohorts){
      res.status(404).json('Cohorts Not Found')

    } else {
      res.set('Content-Type', 'application/json')
        res.send(humps.camelizeKeys(cohorts));
    }
  })
  .catch(err => {
    res.send(err);
  })
};

exports.post = function(req,res,next) {
  knex('campuses')
  .then(campus => {
    console.log("the campus to add", campus);//question for Parker why is this coming back as undefined
    return knex('campuses').insert({
      campus_name: req.body.campus_name,
      campus_city: req.body.campus_city,
      campus_state: req.body.campus_state
    }, '*')
  })
  .then(campus => {
    if(!campus){
      return next();
    }
    res.set('Content-Type', 'application/json');
    res.send(humps.camelizeKeys(campus)[0]);
  })
  .catch( err => {
    next(err);
  });
};

exports.delete = function(req,res,next) {
  let campus;
  knex('campuses')
  .where('id', req.params.id)
  .then( row => {
    if(!row){
      return next()
    }
    campus = row;
    return knex('campuses')
    .del()
    .where('id', req.params.id);
  })
  .then(() => {
    delete campus[0].id;
    res.send(humps.camelizeKeys(campus)[0]);
  })
  .catch( err => {
    res.send(err);
  })
};
