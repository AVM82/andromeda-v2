const db = require('../dao/db');
module.exports.getData = (req, res) => {
    db.findUserById(1)
        .then((result) => {
            const user = result.rows[0];
            res.status(200).json({
                user: user,
                email: user.email,
            })
        })
        .catch((e) => console.log(e.stack))
};