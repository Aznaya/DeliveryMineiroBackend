exports.create = function (req, res) {
    var data = req.body;
    var nome = req.body.nome;
    var senha = req.body.senha;
    var cpf = req.body.cpf;

    var valida = validaDados(nome, senha, cpf);
    switch (valida) {
        case 0:
            req.getConnection(function (err, connection) {
                if (err) return res.status(400).json();
                connection.query('INSERT INTO usuario SET ?', [data], function (err, result) {
                    if (err) return res.status(400).json(err);

                    return res.status(200).json(result);
                });
            });

            break;
        case -1:
            res.send('Por Favor preencher o nome');
            break;
        case -2:
            res.send('Senha precisa ser maior ou igual a 5 caracteres');
            break;
        case -3:
            res.send('Cpf inválido');
            break;
    }
}

exports.getByCpf = function (req, res) {
    var Registro = req.params.cpf;

    console.log('Registro para busca: ', Registro);

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('SELECT * FROM usuario WHERE cpf = ?', [Registro],
            function (err, result) {
                if (err) return res.status(400).json(err);

                return res.status(200).json(result[0]);
            });
    });
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


function validaDados(nome, senha, cpf) {
    if (nome.length == 0) {
        return -1;
    } else if (senha.length < 5) {
        return -2;
    } else if (cpf.length != 11) {
        return -3
    } else {
        return 0;
    }
}