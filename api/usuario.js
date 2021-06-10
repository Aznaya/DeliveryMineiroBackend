exports.create = function (req, res) {
    var data = req.body;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('INSERT INTO usuario SET ?', [data], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}

exports.getById = function (req, res) {
    var Registro = req.params.id;
    
    console.log('Registro para busca: ', Registro);

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [Registro],
            function (err, result) {
                if (err) return res.status(400).json(err);

                return res.status(200).json(result[0]);
            });
    });
}
exports.auth = function(req, res) {
	var cpf = req.body.cpf;
	var senha = req.body.senha;
	if (cpf && senha) {
        req.getConnection(function (err, connection) {
		connection.query('SELECT * FROM usuario WHERE cpf = ? AND senha = ?', [cpf, senha], function(err, results) {
            if (err) return res.status(400).json(err);
			if (results.length > 0) {
				res.send('Login realizado com sucesso');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
    });
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
    
}


exports.update = function (req, res) {
    var data = req.body,
        Registro = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('UPDATE usuario SET nome = ?, senha = ?, senha_confirmada = ?, cpf = ?, endereco = ?, ' +
            'id_tipo_conta = ? WHERE id_usuario = ? ',
         [data.nome, data.senha, data.CPF_CNPJ, data.Endereco, data.empresa, Registro],
            function (err, result) {
                if (err) return res.status(400).json(err);

                return res.status(200).json(result);
            });
    });
}

exports.delete = function (req, res) {
    var Registro = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('DELETE FROM usuario WHERE id_usuario = ? ', [Registro], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}