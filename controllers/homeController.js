const router = require('express').Router();

router.get('/register-password', (req, res) => {
    res.render('login_views/login_createpw', {
        layout: false,
        id: req.query.id,
        msg: () => 'empty'
    });
})

router.get('/login-password', (req, res) => {
    res.render('login_views/login_pw', {
        layout: false,
        id: req.query.id,
        msg: () => 'empty'
    });
});

router.get('/login-id', (req, res) => {
    if (req.user)
        return res.redirect('/');
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

module.exports = router;