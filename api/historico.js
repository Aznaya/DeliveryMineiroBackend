exports.list = function (req, res) {
    console.log(`Listando: `)
    req.getConnection(function (err, connection) {
        if (err) return res.status(400).json();
        connection.query(
            'SELECT * FROM historico; ',
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
        connection.query('INSERT INTO historico SET ?', [data], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result);
        });
    });
}