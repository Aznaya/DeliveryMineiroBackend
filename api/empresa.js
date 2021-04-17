
exports.getById = function (req, res) {
    var Registro = req.params.id;
    
    console.log('Registro para busca: ', Login_idchave);

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('SELECT * FROM empresa WHERE Login_idchave = ?', [Login_idchave],
            function (err, result) {
                if (err) return res.status(400).json(err);

                return res.status(200).json(result[0]);
            });
    });
}

exports.create = function (req, res) {
    var data = req.body;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('INSERT INTO empresa SET ?', [data], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}

exports.update = function (req, res) {
    var data = req.body,
        Registro = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('UPDATE empresa SET Empresa = ?, Conta_Fiado = ?, Valor = ? WHERE Login_idchave = ? ',
         [data.Empresa, data.Conta_Fiado, data.Valor, Login_idchave],
            function (err, result) {
                if (err) return res.status(400).json(err);

                return res.status(200).json(result);
            });
    });
}

exports.delete = function (req, res) {
    var Id = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('DELETE FROM empresa WHERE Login_idchave = ? ', [ILogin_idchave], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}