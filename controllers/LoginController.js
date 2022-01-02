const accountModel = require('../models/accountModel');
const adminModel = require('../models/adminModel');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const salt = 10;
const passport = require('passport');

router.post('/id', async (req, res) => {
    let id = req.body.id;
    //kiểm tra id có tồn tại trong database không
    const user = await accountModel.getByUsername(req.body.id);
    if (user.length > 0) {
        //nếu có user thì check xem có password chưa?
        if (!user[0].password) {
            //là chưa tạo
            return res.redirect('/register-password?id=' + id);
        }
        return res.redirect('/login-password?id=' + id);
    }
    //nếu không có user
    //trường hợp là admin
    const admin = await adminModel.getByUsername(req.body.id);
    if (admin.length > 0) {
        return res.redirect('/login-password?id=' + id);
    }
    return res.render('login_views/login_id', {
        layout: false,
        msg: () => 'login_partials/msg_id',
        color: '#ff835d',
        message: 'Account does not exist!'
    });
});

router.post('/password', async (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.send("error001");
        }
        if (!user) {
            return res.render('login_views/login_pw', {
                layout: false,
                id: req.body.id,
                msg: () => 'login_partials/msg_password',
                color: '#f3d97a',
                message: 'Passcode incorrect !'
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.render('login_views/login_pw', {
                    layout: false,
                    id: req.body.id,
                    msg: () => 'login_partials/msg_password',
                    color: '#f3d97a',
                    message: err
                });
            }
            console.log('login successfully');
            res.cookie('user', user.username);
            return res.redirect('/home');
        })
    })(req, res, next);
});

router.post('/crpassword', async (req, res) => {
    const pwhashed = await bcrypt.hash(req.body.confirm_password, salt);
    const user = {
        password: pwhashed
    }
    const rs = await accountModel.update(req.body.id, user);
    res.redirect('/login-id?status=true');
    return;
});

router.post('/rspassword', async (req, res) => {
    if (req.cookies.user == 'admin') {
        const admin = await adminModel.getOne();
        let checkpw = await bcrypt.compare(req.body.current_password, admin.password);
        if (!checkpw) {
            return res.render('login_views/login_resetpw', {
                layout: false,
                message: 'Current Passcode is wrong',
                color: '#FF7B7B',
                msg: () => 'login_partials/msg_password'
            });
        }

        if (req.body.confirm_password != req.body.create_password) {
            return res.render('login_views/login_resetpw', {
                layout: false,
                message: 'Inconsistent new passcode',
                color: '#FF7B7B',
                msg: () => 'login_partials/msg_password'
            });
        }

        const pwhashed = await bcrypt.hash(req.body.confirm_password, salt);
        const entity = {
            password: pwhashed,
        }
        const rs = await adminModel.update(entity);
        res.redirect('/home');
        return;
    }

    const userdb = await accountModel.getByUsername(req.cookies.user);
    let checkpw = await bcrypt.compare(req.body.current_password, userdb[0].password);
    if (!checkpw) {
        return res.render('login_views/login_resetpw', {
            layout: false,
            message: 'Current Passcode is wrong',
            color: '#FF7B7B',
            msg: () => 'login_partials/msg_password'
        });
    }
    const pwhashed = await bcrypt.hash(req.body.confirm_password, salt);
    const user = {
        password: pwhashed,
        balance: userdb[0].balance
    }
    const rs = await accountModel.update(req.cookies.user, user);
    res.redirect('/home');
    return;
});

module.exports = router;
