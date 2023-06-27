const express = require('express')
const routes = express.Router();
const login = require('./src/controllers/login')
const cadastro = require('./src/controllers/cadastro');
const home = require('./src/controllers/home');

routes
    .get('/', home.gethome)
    .get('/AddCol', cadastro.colaborador).post('/AddCol', cadastro.colaboradorInsert)
    .get('/AddProc', cadastro.processo).post('/AddProc', cadastro.processoInsert)
    .get('/LoginCol', login.getLoginCol).post('/LoginCol', login.loginCol)
    .get('/Logout', login.logout)
    .get('/HomeCol', home.homeCol)


module.exports = routes;