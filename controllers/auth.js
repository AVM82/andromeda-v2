const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const db = require('../dao/db');

module.exports.login = (req, res) => {
    const candidate = new User(req.body.email, req.body.password);

    db.findUser(candidate)
        .then((result) => {
            authorize(result);
        })
        .catch(e => {
            res.status(500).json({
                success: "false",
                message: e.message
            })
        });

    function authorize(result) {
        if (result.rows.length === 0) {
            res.status(404)
                .json({
                    success: "false",
                    message: "User not found"
                }
            )
        } else {
            const passwordCompare = bcrypt.compareSync(candidate.password, result.rows[0].password);
            if (passwordCompare) {
                const token = jwt.sign({
                    email: result.rows[0].email,
                    userId: result.rows[0].id
                }, 'andromeda', {expiresIn: 60 * 60});
                res.status(200).json({
                    token: `Bearer ${token}`
                })
            } else {
                res.status(401).json({
                    success: "false",
                    message: "Bad credentials"
                })
            }
        }
    }
};

module.exports.register = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const Candidate = new User(req.body.email, bcrypt.hashSync(password, salt));

    db.findUser(Candidate)
        .then((result) => {
            saveUser(result);
        })
        .catch((e) => {
            res.status(500).json({
                success: "false",
                message: e.message
            });
        });

    function saveUser(result) {
        if (result.rows.length !== 0) {
            res.status(409).json({
                success: "false",
                message: "User already exist"
            })
        } else {
            db.saveUser(Candidate)
                .then((result) => {
                    res.status(201).json({
                            success: "true",
                            id: result.rows[0].id,
                            user: Candidate
                        }
                    )
                })
                .catch((e) => {
                    res.status(500).json({
                        success: "false",
                        message: e.message
                    });
                });
        }
    }
};
