var express = require('express');
var App = express.Router();

var Empresa = getmodule('api/empresa');
var Historico = getmodule('api/historico');
var Login = getmodule('api/login');

/* GET home page. */
App.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

console.log('TESTE DE ROTA')
App.get('/empresas', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM Empresa', [], function (err, result) {
      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});

module.exports = App;
