const express = require("express");
const route = express.Router();


const services = require('../services/render');
const controller = require('../controller/UserController');

/**
 *  @description Root Route
 *  @method GET /
 */


//index
route.get('/', services.homeRoutes);

//usuários renders
route.get('/user/form', services.form);
route.get('/user/login', services.login);
route.get('/user/my-account/:id', services.my_account);
route.get('/update-user', services.update_user);
route.get('/admin/users', services.users);

//usuário
route.post('/auth/user', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.get('/user/my-account/delete/:id', controller.delete);


//login
route.post('/auth/user/login', controller.login);

module.exports = route