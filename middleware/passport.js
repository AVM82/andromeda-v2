const pref = require('../config/preference');
const db = require('../dao/db');
const JwtSrategy = require('passport-jwt').Strategy;
const ExtyractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtyractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: pref.jwtKey
};

module.exports =  (passport) => {
    passport.use(
        new JwtSrategy(options, (payload, done) => {
            db.findUserById(payload.userId)
                .then(result => {
                    const user = result.rows[0];
                    if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                })
                .catch(e => {
                    console.log(e.message)
                });

        })
    )
};

