const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const db = require('../dao/db');
const pref = require('../config/preference');
const errorHandler = require('../utils/errorHandler');
const mailHandler = require('../utils/mailHandler');

module.exports.login = (req, res) => {
    const candidate = new User(req.body.email, req.body.password);
    db.findUser(candidate)
        .then((result) => {
            authorize(result);
        })
        .catch(e => {
            errorHandler(e, res);
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
                }, pref.jwtKey, {expiresIn: 60 * 60});
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

function generatePasswordHash(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports.register = (req, res) => {

    const Candidate = new User(req.body.email, generatePasswordHash(req.body.password));

    db.findUser(Candidate)
        .then((result) => {
            saveUser(result);
        })
        .catch((e) => {
            errorHandler(e, res);
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
                    errorHandler(e, res);
                });
        }
    }
};

module.exports.forgot = (req, res) => {
    db.findUserByEmail(req.body.email)
        .then((result) => refreshed(result))
        .catch((error) => errorHandler(error, res));

    function refreshed(result) {
        if (result.rows.length === 0) {
            res.status(404).json({
                success: "false",
                message: "User not found"
            })
        } else {
            const randomPassword = Math.random().toString(36).slice(-8);
            db.changePasswordForUser(req.body.email, generatePasswordHash(randomPassword))
                .then(mailHandler(res, req.body.email, `Ваш новый пароль для входа в систему ${randomPassword}`))
                .catch(error => errorHandler(error, res));
        }
    }
};