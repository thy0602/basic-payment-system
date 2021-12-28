const router = require('express').Router();
const adminModel = require("../models/adminModel");
const transacRecordModel = require("../models/transactionRecordModel");
const accountModel = require("../models/accountModel");

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

router.get('/home', async (req, res) => {
    if (!req.cookies.user)
        return res.redirect('/login-id');
    console.log("User", req.cookies.user);
    try {
        if (user.cookies.user == 'admin') {
            //Lấy ra danh sách các transaction mà account đã chi ra (nộp vào cho admin)
            const transactions = await transacRecordModel.getAllSortedByTime();
            const admin = await adminModel.getOne();

            return res.render("admin/adminHome", {
                transactions: transactions,
                adminBalance: admin.balance,
                totalTransactions: transactions.length,
                cssP: () => "css",
                scriptP: () => "scripts",
                navP: () => "nav",
                footerP: () => "footer",
                title: "Admin Home",
                isHome: 1
            });
        }

        //Lấy ra danh sách các transaction của user hiện tại
        const transactions = await transacRecordModel.getAllTransactionByUsername(req.cookies.user);
        const user = await accountModel.getOneByUsername(req.cookies.user);

        res.render("userHome", {
            transactions: transactions,
            balance: user.balance,
            cssP: () => "css",
            scriptP: () => "scripts",
            navP: () => "nav",
            footerP: () => "footer",
            title: "User Home"
        });
    } catch (error) {
        console.log("Home / error:", error);
        res.status(400).send(error.message);
    }
});

module.exports = router;
