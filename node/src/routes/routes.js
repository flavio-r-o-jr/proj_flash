const express = require('express');
const routes = express.Router();
const empresaController = require('../controllers/empresaController');
const funcionarioController = require('../controllers/funcionarioController');

// Rotas das empresas
routes.post('/empresas', empresaController.insert);
routes.get('/empresas', empresaController.selectAll);
routes.get('/empresas/:id', empresaController.select);
routes.put('/empresas/:id', empresaController.update);
routes.delete('/empresas/:id', empresaController.delete);

// Rotas dos Funcionários
routes.post('/funcionarios', funcionarioController.insert);
routes.get('/funcionarios', funcionarioController.selectAll);
routes.get('/funcionarios/:id', funcionarioController.select);
routes.put('/funcionarios/:id', funcionarioController.update);
routes.delete('/funcionarios/:id', funcionarioController.delete);
routes.get('/relatorio/:id', funcionarioController.funEmpresa);




module.exports = routes;