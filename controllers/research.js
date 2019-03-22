const db = require('../dao/db');

module.exports.getAll = (req, res) =>  {
    db.selectAllResearch()
        .then((result) => {
            res.status(200).json(result.rows);
        })
        .catch((e) => console.log(e.stack))
};
