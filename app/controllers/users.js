const knex    = require('../../config/knex');
const humps   = require('humps');
const {camelizeKeys, decamelizeKeys} = require('humps');


exports.get = function(req,res,next) {
  knex('users')
  .orderBy('user_name', 'desc')
  .then((user) =>{

    res.send(humps.camelizeKeys(user));
  })
  .catch((err) => {
    next(err);
  });

}

exports.byid = function(req,res,next) {
  let userId = req.params.id;
  console.log('user', userId);
  knex('users')
  .where('id', userId)
  .then(user => {
    if(!user){
      res.status(404).json("User Not Found");
    } else {

      res.send(humps.camelizeKeys(user)[0]);
    }
  })
  .catch(err => {
    console.err(err);
  })
}

exports.delete = function(req,res,next) {
  const id = Number.parseInt(req.params.id);

  if(Number.isNaN(id)){
   return next();
  }

  knex('users')
  .where('id', id)
  .first()
  .then((user) => {
    console.log("the user", req.params.id);
    if(!user){
      throw createHttpError(404, 'Not found');
      // return next()
    }
    return knex('users')
    .del()
    .where('id', id)
    .returning('*')
  })
  .then((user)=> {
    console.log("the usre in delete", typeof user[0]);
    res.send(user[0]);
  })
  .catch( err => {
    next(err);
  });
}
