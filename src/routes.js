const express = require('express');

const AdminController = require('./controllers/AdminController');
const auth = require('./middlewares/auth');
const ensureAdmin = require('./middlewares/ensureAdmin');

const routes = express.Router();

routes.post('/admin/create', auth, ensureAdmin, AdminController.create);
routes.post('/admin/login', AdminController.login);

module.exports = routes;