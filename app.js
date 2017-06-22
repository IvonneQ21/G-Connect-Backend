
'use strict';

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
  //what is the definition of the configuration.
  //what is necessary to configure it.

}

//use npm install cors - this stands for Cross- origin resouce sharing
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4210;
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cohortsRoute = require('./routes/cohorts');
const campusesRoute = require('./routes/campuses');
const usersRoute = require('./routes/users');
app.use(bodyParser.json());
app.use(express.static(path.join('public')));


//other modules that might need to be required later

// const cookieParser = require('cookie-parser');

//
// const users = require('./routes/users');
// const admin = require('./routes/admin');
// const cohorts = require('./routes/cohorts');// already up there.
// const campus = require('./routes/campus');
// const projects = require('./routes/projects')
// const skills = require('./routes/skills');
// const profile = require('./routes/profile');

// app.use(users)
app.use(cohortsRoute);
app.use(campusesRoute);
app.use(usersRoute);
// app.use(campus)
// app.use(projects)
// app.use(skills)

app.use(function(req, res){
  res.sendStatus(404);
})


app.get('/', function(req, res) {
  res.send('Hello World, Ivonne at work here');
  res.send(path.resolve(__dirname, 'buil'))
});

app.listen(PORT, () => {
  console.log(`Galvanize Connect server listening on port ${PORT}`);
});


module.exports = app;











// const express = require('express');
// const fs = require('fs');
// const app = express();
// const bodyParser = require('body-parser');
// const passport = require('passport');
//
// // var app = express(), bunyanLogger = require('express-bunyan-logger');
// // var compress = require('compression');
// var port = process.env.PORT;
// // require('dotenv').config({silent: true})
// // require('dotenv').load();
//
// app.set('port', process.env.PORT_DEVELOPMENT || port);
// // app.use(compress())
// // app.use(bodyParser.json({limit: '25mb'}));
// // app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// app.all('/*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   if (req.method == 'OPTIONS') {
//     res.status(200).end();
//   } else {
//     next();
//   }
// });
//
// //app.all('/gc/*', [require('./app/authorizations/validate')]);
// app.use('/', require('./app/routes'));
//
// app.use(function(req, res, next) {
//   var err = new Error('Invalid URL Found');
//   res.status(404).json({
//     "status": 404,
//     "message": "Invalid URL / Page not found - Please return to Galvanize-Connect"
//   });
//   next(err);
// })
//
// app.listen(app.get('port'), function() {
//   console.log('running galvanize-connect on port', process.env.PORT_DEVELOPMENT)
// })

module.exports = app;
