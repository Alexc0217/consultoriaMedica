const express = require("express");
const route = express.Router();


const services = require('../services/render');
const controller = require('../controller/users');

/**
 *  @description Root Route
 *  @method GET /
 */


route.get('/', services.homeRoutes);
route.get('/user/form', services.form);

route.get('/users', controller.get)
route.post('/user/create', controller.create)


module.exports = route