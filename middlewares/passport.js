const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountModel = require('../models/accountModel');
const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');

const JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ThisIsASecretKey";
opts.algorithms = ["HS256"];


module.exports = app => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password'
    },
        async (username, password, done) => {
            let user;
            try {
                console.log("username: ", username);
                user = await accountModel.getByUsername(username);
                if (user.length == 0) {
                    user = await adminModel.getByUsername(username);
                }
                // console.log("user: ", user);
                const pwd = await bcrypt.compare(password, user[0].password);
                if (!pwd) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    })
                }
                return done(null, user[0]);
            } catch (error) {
                console.log("Error passport:", error);
                return done(error);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });
    passport.deserializeUser(async (user, done) => {
        try {
            let usertmp = await accountModel.getByUsername(user);
            if (usertmp.length == 0) {
                usertmp = await adminModel.getByUsername(user);
            }
            done(null, usertmp[0].username);
        } catch (error) {
            done(new Error('error'), null);
        }
    })

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            console.log("jwt_payload", jwt_payload);

            let user;
            try {
                console.log("username: ", username);
                user = await accountModel.getByUsername(username);
                if (user.length == 0) {
                    user = await adminModel.getByUsername(username);
                }
                // console.log("user: ", user);
                const pwd = await bcrypt.compare(password, user[0].password);
                if (!pwd) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    })
                }
                return done(null, user[0]);
            } catch (error) {
                console.log("Error passport:", error);
                return done(error);
            }
        })
    );


    app.use(passport.initialize());
    app.use(passport.session());
}