var express = require('express');
var App = express.Router();

var Empresa = getmodule('api/empresa');
var Historico_Empresa = getmodule('api/historico_empresa');
var Historico_Usuario = getmodule('api/historico_usuario');
var Usuario = getmodule('api/usuario');
var Auth = getmodule('api/autenticacao');
var Lista_Pedido = getmodule('api/lista_pedidos');
var Opcao = getmodule('api/opcao');

/* GET home page. */
App.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// Para teste, realiza uma consulta no BD que retorna a tabela Empresa
App.get('/teste/empresas', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM empresa', [], function (err, result) {
      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});

// Para teste, realiza uma consulta no BD que retorna a tabela Usuario
App.get('/teste/usuarios', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM usuario', [], function (err, result) {
      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});


// Para teste, realiza uma consulta no BD que retorna a tabela Historico Empresa
App.get('/teste/historico/empresas', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM historico_empresa', [], function (err, result) {
      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});

// Para teste, realiza uma consulta no BD que retorna a tabela Tipo de Contas
App.get('/teste/tipocontas', function (req, res) {
  req.getConnection(function (err, connection) {
    if (err) return res.status(400).json();
    connection.query('SELECT * FROM tipo_conta', [], function (err, result) {

      if (err) return res.status(400).json();
      console.log('Conexão ao MYSQL realizada');
      return res.status(200).json(result);
    });
  });
});

//Login
App.route('/auth')
  .post(Auth.auth)

//  Empresa ...
App.route('/empresa')
  .post(Empresa.create)

App.route('/empresa/:cnpj')
  .get(Empresa.getByCnpj)
  .put(Empresa.update)
  .delete(Empresa.delete)

//  Usuario ...
App.route('/usuario')
  .post(Usuario.create)

App.route('/usuario/:cpf')
  .get(Usuario.getByCpf)
  .put(Usuario.update)
  .delete(Usuario.delete)

//  Historico ...
App.route('/historico/empresa')
  .get(Historico_Empresa.list)
  .post(Historico_Empresa.create)

App.route('/historico/usuario')
  .get(Historico_Usuario.list)
  .post(Historico_Usuario.create)

// Lista de pedidos
App.route('/lista-pedido')
  .post(Lista_Pedido.create)
  .get(Lista_Pedido.list)

App.route('/lista-pedido/:id')
  .get(Lista_Pedido.getById)
  .delete(Lista_Pedido.delete)

// Opções
App.route('/opcao')
  .post(Opcao.create)
  .get(Opcao.list)

App.route('/lista-pedido/:id')
  .delete(Opcao.delete)

module.exports = App;
