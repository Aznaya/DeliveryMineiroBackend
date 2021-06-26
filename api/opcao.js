exports.list = function (req, res) {
    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query(
            'SELECT * FROM opcao;',
            [], function (err, result) {
                if (err) return res.status(400).json();

                return res.status(200).json(result);
            });
    });
}

exports.create = function (req, res) {
    var data = req.body;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('INSERT INTO opcao SET ?;', [data], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}

exports.delete = function (req, res) {
    var id_opcao = req.params.id;

    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query('DELETE FROM opcao WHERE id_opcao = ?;', [id_opcao], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}
