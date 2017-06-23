
'use strict';

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

//use npm install cors - this stands for Cross- origin resouce sharing
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4210;
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cohortsRoute = require('./routes/cohorts');
const campusesRoute = require('./routes/campuses');
const usersRoute = require('./routes/users');
const cookieParser = require('cookie-parser');
const morgan= require('morgan');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}


app.use(bodyParser.json());
app.use(express.static(path.join('public')));
// app.use('/api/authenticate', authenticateController.authenticate)//from video tutorial.


//other modules that might need to be required later

// const users = require('./routes/users');
// const admin = require('./routes/admin');
// const cohorts = require('./routes/cohorts');// already up there.
// const campus = require('./routes/campus');
// const projects = require('./routes/projects')
// const skills = require('./routes/skills');
// const profile = require('./routes/profile');

// app.use(users)
app.use(campusesRoute);
app.use(cohortsRoute);
app.use(usersRoute);
// app.use(campus)
// app.use(projects)
// app.use(skills)

app.use((req, res) => {
  res.sendStatus(404);
});


app.get('/', function(req, res) {
  res.send('Hello World, Ivonne at work here');
  res.send(path.resolve(__dirname, 'buil'))
});

app.listen(PORT, () => {
  if(app.get('env') !== 'test'){
    console.log(`Galvanize Connect server listening on port ${PORT}`);
  }
});
module.exports = app;
