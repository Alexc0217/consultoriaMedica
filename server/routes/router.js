const express = require("express");
const route = express.Router();


const services = require('../services/render');
const userController = require('../controller/UserController');
const scheduleController = require('../controller/ScheduleController');

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
route.get('/user/user-page/:id', services.user_page);

//usuário
route.post('/auth/user', userController.create);
route.get('/api/users', userController.find);
route.put('/api/users/:id', userController.update);
route.get('/user/my-account/delete/:id', userController.delete);


//login
route.post('/auth/user/login', userController.login);

//agendamentos renders
route.get('/admin/schedules', services.schedules);

//agendamentos
route.get('/schedule/form/:id', services.schedule_form);
route.post('/schedule/form', scheduleController.create);
route.get('/api/schedules', scheduleController.schedules);
route.get('/schedule/desmarcar/:id', scheduleController.delete);

route.get('*', services.page_not_found);
module.exports = route
