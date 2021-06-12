exports.auth = function (req, res) {
	var cpf_cnpj = req.body.cpf_cnpj;
	var senha = req.body.senha;

	if (cpf_cnpj && senha) {
		if (cpf_cnpj.length <= 11) {
			req.getConnection(function (err, connection) {
				connection.query('SELECT * FROM usuario WHERE cpf = ? AND senha = ?', [cpf_cnpj, senha], function (err, results) {
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
			req.getConnection(function (err, connection) {
				connection.query('SELECT * FROM empresa WHERE cnpj = ? AND senha = ?', [cpf_cnpj, senha], function (err, results) {
					if (err) return res.status(400).json(err);
					if (results.length > 0) {
						res.send('Login realizado com sucesso');
					} else {
						res.send('Incorrect Username and/or Password!');
					}
					res.end();
				});
			});

		}
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}

}