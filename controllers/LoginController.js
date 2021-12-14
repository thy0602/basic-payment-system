// const { session } = require('passport');            //temp
const accountModel = require('../models/accountModel');   //temp
const router = require('express').Router();
const bcrypt = require('bcrypt');
const salt = 10;

router.post('/id', async (req, res) => {
    let id = req.body.id;
    //kiểm tra id có tồn tại trong database không
    const user = await accountModel.getByUsername(req.body.id);
    if (user.length > 0) {
        //nếu có user thì check xem có password chưa?
        if (!user[0].password) {
            //là null
            return res.redirect('/login/crpassword?id=' + id);
        }
        return res.redirect('/login/password?id=' + id);
    } else {
        //nếu không có user
        res.render('login_views/login_id', {
            layout: false,
            msg: () => 'login_partials/msg_id',
            color: '#ff835d',
            message: 'Account does not exist!'
        });
        return;
    }
});

router.post('/password', async (req, res) => {
    //kiểm tra password
    const user = await accountModel.getByUsername(req.body.id);
    const check = await bcrypt.compare(req.body.password, user[0].password)
    //nếu đúng
    if (check) {
        res.redirect('/');
        return;
    } else {
        res.render('login_views/login_pw', {
            layout: false,
            id: req.body.id,
            msg: () => 'login_partials/msg_password',
            color: '#f3d97a',
            message: 'Passcode incorrect !'
        });
        return;
    }
});

router.post('/email', (req, res) => {
    //maybe kiểm tra email tồn tại, tạm thời thành công
    res.render('login_views/login_createpw', {
        email: req.body.email,
        id: req.body.id,
        layout: false
    })
    return;
});

router.post('/crpassword', async (req, res) => {
    const pwhashed = await bcrypt.hash(req.body.confirm_password, salt);
    const user = {
        password: pwhashed,
        balance: null
    }
    const rs = await accountModel.update(req.body.id, user);
    res.redirect('/login/id?status=true');
    return;
});

router.get('/crpassword', (req, res) => {
    res.render('login_views/login_createpw', {
        layout: false,
        id: req.query.id,
        msg: () => 'empty'
    });
})

router.get('/password', (req, res) => {
    res.render('login_views/login_pw', {
        layout: false,
        id: req.query.id,
        msg: () => 'empty'
    });
});

router.get('/id', (req, res) => {
    if (req.query.status == 'true') {
        return res.render('login_views/login_id', {
            layout: false,
            color: '#49c53f',
            message: 'Updated passcode successful!',
            msg: () => 'login_partials/msg_id'
        });
    }
    return res.render('login_views/login_id', {
        layout: false,
        msg: () => 'empty'
    });
});

router.get('/', (req, res) => {
    res.redirect('/login/id');
    return;
});

module.exports = router;