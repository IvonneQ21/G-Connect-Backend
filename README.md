# G-Connect-Backend
This repo contains API information for Galvanize_Connect_react application.


TODO: required endpoints list
  - desired routing structure
  - endpoint roots (eg; campuses; cohorts; profiles)
  - admin only endpoints;
  - instructor only endpoints;
  - short endpoint requirement description, see example below




  router.post('/login', auth.login)
        .get('/users', usersCtrl.get)
        .get('/users/:id', usersCtrl.byid)
        .delete('/users/:id', usersCtrl.delete)

        .get('/cohorts', cohortsCtrl.get)
        .get('/cohorts/:id', cohortsCtrl.byid)
        .post('/cohorts', cohortsCtrl.post)
        .delete('/cohorts/:id', cohortsCtrl.delete)

        .get('/profiles', cohortsCtrl.get)
        .get('/profiles/cohorts/members/:cohort_id', cohortsCtrl.members);


        Writing desired routes for student user

    router.post('/login', auth.login)
      .get('/home', homeCtrl.get)
      .get('/posts', get all Posts)
      .get('/comments', all user's comments)
      .get('/jobs', get all jobs)
      .post('/')

      .get('/user/:id/profile', profileCtrl.sbyid)//get a use's profile based on user/id
      .post('/user/:id/profile/skills', profileCtrl.posts )// get user profile by their id and allows to add skills
      .post('/user/:id/profile/projects', profileCtrl.posts)//get user profile by id and allows to add projects
      .put('/user/:id/profile/skills', skillsCtrl.put)
      .put('/user/:id/profile/projects', projectsCtrl.put)
      .delete('/user/:id/profile/skill', profileCtrl.delete)// deletes user skill


    cohort routes
      .get('/cohort_members/:cohort_id/users', cohortsCtrl.get)
      .get('/cohort_members/:cohort_id/users/user_id', cohortsCtrl.get )
      .post('/cohort')


      how do we make calls for the social media links that the user give us.

      route.get('/users_social_network/user_id/:id', users_social_network )
            .get('/users_social_network/')
