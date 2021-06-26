
exports.getById = function (req, res) {
    var Registro = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('SELECT * FROM empresa WHERE id_empresa = ?', [Registro],
            function (err, result) {
                if (err) return res.status(400).json(err);

                return res.status(200).json(result[0]);
            });
    });
}

exports.create = function (req, res) {
    var data = req.body;
    var nome = data.nome;
    var senha = data.senha;
    var cnpj = data.cnpj;

    var valida = validaDados(nome, senha, cnpj);
    switch (valida) {
        case 0:
            req.getConnection(function (err, connection) {
                if (err) return res.status(400).json();
                connection.query('INSERT INTO empresa SET ?', [data], function (err, result) {
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
            res.send('CNPJ inválido');
            break;
    }
}

exports.update = function (req, res) {
    var data = req.body,
        Registro = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('UPDATE empresa SET nome = ?, senha = ?, senha_confirmada = ?, id_tipo_conta = ?,' +
            'cnpj = ?, endereco = ? WHERE id_empresa = ? ', [data.Empresa, data.Conta_Fiado, data.Valor, Registro],
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
        connection.query('DELETE FROM empresa WHERE id_empresa = ? ', [Registro], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}

function validaDados(nome, senha, cnpj) {
    if (nome.length == 0) {
        return -1;
    } else if (senha.length < 5) {
        return -2;
    } else if (cnpj.length != 14) {
        return -3
    } else {
        return 0;
    }
}