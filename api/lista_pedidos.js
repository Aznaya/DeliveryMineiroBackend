exports.list = function (req, res) {
    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query(
            'SELECT * FROM lista_pedidos;',
            [], function (err, result) {
                if (err) return res.status(400).json();

                return res.status(200).json(result);
            });
    });
}

exports.getById = function (req, res) {
    var Registro = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('SELECT * FROM lista_pedidos WHERE id_lista_pedidos = ?', [Registro],
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
        connection.query('INSERT INTO lista_pedidos SET ?', [data], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}

exports.delete = function (req, res) {
    var Registro = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('DELETE FROM lista_pedidos WHERE id_lista_pedidos = ? ', [Registro], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}