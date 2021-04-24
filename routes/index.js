var express = require('express');
var App = express.Router();

var Empresa = getmodule('api/empresa');
var Historico = getmodule('api/historico');
var Login = getmodule('api/login');

/* GET home page. */
App.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Para teste, realiza uma consulta no BD que retorna a tabela Empresa
App.get('/teste/empresas', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM Empresa', [], function (err, result) {
      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});

// Para teste, realiza uma consulta no BD que retorna a tabela Login
App.get('/teste/usuarios', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM Login', [], function (err, result) {
      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});

// Para teste, realiza uma consulta no BD que retorna a tabela Historico
App.get('/teste/historicos', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM Historico', [], function (err, result) {
      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});

module.exports = App;
