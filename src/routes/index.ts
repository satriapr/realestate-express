import { Router } from 'express'
import passport from 'passport'

import SearchController from '../controllers/SearchController'
import ProjectController from '../controllers/ProjectController'
import ProjectService from '../services/ProjectService'
import BuilderController from '../controllers/BuilderController'
import BuilderService from '../services/BuilderService'
import CityController from '../controllers/CityController'
import CityService from '../services/CityService'
import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import { responseError } from '../utils/response'
import { checkReqAuth } from '../utils/request'
import Constant from '../constants/Constant'

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

const routes: Router = Router()

// when login is successful, retrieve user info
routes.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
routes.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.'
  });
});

// When logout, redirect to client
routes.get('/logout', (req, res) => {
  res.clearCookie('session.sig')
  res.clearCookie('session')
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with facebook
routes.get('/facebook', passport.authenticate('facebook'));

// redirect to home page after successfully login via facebook
routes.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed'
  })
);

// Route middleware, check timestamp and compare signature before proceeding
routes.use('/api/*', (req, res, next) => {
  const isReqAuthenticated = checkReqAuth(req)
  if(isReqAuthenticated) next()
  else return res.json(responseError(
      Constant.UNAUTHORIZED.CODE, 
      Constant.UNAUTHORIZED.MESSAGE, 
      {}
    )
  )
})

// search all route
const searchController = new SearchController(new ProjectService(), new BuilderService(), new CityService())
routes.get(`/api/searchall`, (req, res) =>
  searchController.getSearch(req, res)
)

// project route
const projectController = new ProjectController(new ProjectService())
routes.get(`/api/projects`, (req, res) =>
  projectController.getProjects(req, res)
)
routes.post(`/api/project`, (req, res) =>
  projectController.storeProject(req, res)
)
routes.delete(`/api/project/:_id`, (req, res) =>
  projectController.deleteProject(req, res)
)

// builder route
const builderController = new BuilderController(new BuilderService())
routes.get(`/api/builders`, (req, res) =>
  builderController.getBuilders(req, res)
)
routes.post(`/api/builder`, (req, res) =>
  builderController.storeBuilder(req, res)
)
routes.delete(`/api/builder/:_id`, (req, res) =>
  builderController.deleteBuilder(req, res)
)

// city route
const cityController = new CityController(new CityService())
routes.get(`/api/cities`, (req, res) =>
  cityController.getCities(req, res)
)
routes.post(`/api/city`, (req, res) =>
  cityController.storeCity(req, res)
)
routes.delete(`/api/city/:_id`, (req, res) =>
  cityController.deleteCity(req, res)
)

// user route
const userController = new UserController(new UserService())
routes.get(`/api/users`, (req, res) =>
  userController.getUsers(req, res)
)
routes.post(`/api/user`, (req, res) =>
  userController.storeUser(req, res)
)
routes.delete(`/api/user/:_id`, (req, res) =>
  userController.deleteUser(req, res)
)

export default routes
