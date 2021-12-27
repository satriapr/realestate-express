"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const SearchController_1 = __importDefault(require("../controllers/SearchController"));
const ProjectController_1 = __importDefault(require("../controllers/ProjectController"));
const ProjectService_1 = __importDefault(require("../services/ProjectService"));
const BuilderController_1 = __importDefault(require("../controllers/BuilderController"));
const BuilderService_1 = __importDefault(require("../services/BuilderService"));
const CityController_1 = __importDefault(require("../controllers/CityController"));
const CityService_1 = __importDefault(require("../services/CityService"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserService_1 = __importDefault(require("../services/UserService"));
const response_1 = require("../utils/response");
const request_1 = require("../utils/request");
const Constant_1 = __importDefault(require("../constants/Constant"));
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';
const routes = (0, express_1.Router)();
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
    res.clearCookie('session.sig');
    res.clearCookie('session');
    res.redirect(CLIENT_HOME_PAGE_URL);
});
// auth with facebook
routes.get('/facebook', passport_1.default.authenticate('facebook'));
// redirect to home page after successfully login via facebook
routes.get('/facebook/redirect', passport_1.default.authenticate('facebook', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed'
}));
// Route middleware, check timestamp and compare signature before proceeding
routes.use('/api/*', (req, res, next) => {
    const isReqAuthenticated = (0, request_1.checkReqAuth)(req);
    if (isReqAuthenticated)
        next();
    else
        return res.json((0, response_1.responseError)(Constant_1.default.UNAUTHORIZED.CODE, Constant_1.default.UNAUTHORIZED.MESSAGE, {}));
});
// search all route
const searchController = new SearchController_1.default(new ProjectService_1.default(), new BuilderService_1.default(), new CityService_1.default());
routes.get(`/api/searchall`, (req, res) => searchController.getSearch(req, res));
// project route
const projectController = new ProjectController_1.default(new ProjectService_1.default());
routes.get(`/api/projects`, (req, res) => projectController.getProjects(req, res));
routes.post(`/api/project`, (req, res) => projectController.storeProject(req, res));
routes.delete(`/api/project/:_id`, (req, res) => projectController.deleteProject(req, res));
// builder route
const builderController = new BuilderController_1.default(new BuilderService_1.default());
routes.get(`/api/builders`, (req, res) => builderController.getBuilders(req, res));
routes.post(`/api/builder`, (req, res) => builderController.storeBuilder(req, res));
routes.delete(`/api/builder/:_id`, (req, res) => builderController.deleteBuilder(req, res));
// city route
const cityController = new CityController_1.default(new CityService_1.default());
routes.get(`/api/cities`, (req, res) => cityController.getCities(req, res));
routes.post(`/api/city`, (req, res) => cityController.storeCity(req, res));
routes.delete(`/api/city/:_id`, (req, res) => cityController.deleteCity(req, res));
// user route
const userController = new UserController_1.default(new UserService_1.default());
routes.get(`/api/users`, (req, res) => userController.getUsers(req, res));
routes.post(`/api/user`, (req, res) => userController.storeUser(req, res));
routes.delete(`/api/user/:_id`, (req, res) => userController.deleteUser(req, res));
exports.default = routes;
//# sourceMappingURL=index.js.map