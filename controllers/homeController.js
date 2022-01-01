const router = require('express').Router();
const adminModel = require("../models/adminModel");
const transacRecordModel = require("../models/transactionRecordModel");
const accountModel = require("../models/accountModel");

router.get('/register-password', (req, res) => {
    if (req.user || req.cookies.user)
        return res.redirect('/home');

    res.render('login_views/login_createpw', {
        layout: false,
        id: req.query.id,
        msg: () => 'empty'
    });
})

router.get('/login-password', (req, res) => {
    if (req.user || req.cookies.user)
        return res.redirect('/home');
    if (!req.query.id)
        return res.redirect('/login-id');

    res.render('login_views/login_pw', {
        layout: false,
        id: req.query.id,
        msg: () => 'empty'
    });
});

router.get('/login-id', (req, res) => {
    if (req.user || req.cookies.user)
        return res.redirect('/home');

    if (req.query.status == 'true') {
        return res.render('login_views/login_id', {
            layout: false,
            color: '#49c53f',
            message: 'Updated passcode successfully!',
            msg: () => 'login_partials/msg_id'
        });
    }
    return res.render('login_views/login_id', {
        layout: false,
        msg: () => 'empty'
    });
});

router.get('/change-password/:id/edit', (req, res) => {
    if (req.user) {
        return res.render('login_views/login_resetpw', {
            layout: false,
            msg: () => 'empty'
        });
    }
    return res.redirect('/home');
})

router.get('/logout', async (req, res, next) => {
    console.log(req.user);
    if (req.user)
        req.logOut();
    res.clearCookie("user");
    return res.redirect('/login-id');
});

router.get('/home', async (req, res) => {
    try {
        if (!req.cookies.user)
            return res.redirect('/login-id');

        if (req.cookies.user == 'admin') {
            //Lấy ra danh sách các transaction mà account đã chi ra (nộp vào cho admin)
            const transactions = await transacRecordModel.getAllSortedByTime();
            const admin = await adminModel.getOne();

            return res.render("admin/adminHome", {
                transactions: transactions,
                adminBalance: admin.balance,
                totalTransactions: transactions.length,
                cssP: () => "css",
                navP: () => "nav",
                scriptP: () => "scripts_home_admin",
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
            navP: () => "nav",
            scriptP: () => "scripts_home_user",
            footerP: () => "footer",
            title: "User Home"
        });
    } catch (error) {
        console.log("Home / error:", error);
        res.status(400).send(error.message);
    }
});

router.get("/manage-users", async (req, res) => {
    try {
        if (!req.cookies.user)
            return res.redirect('/login-id');
        if (req.cookies.user != 'admin')
            return res.redirect('/home');

        // Lấy ra danh sách users (accounts)
        const accounts = await accountModel.getAll();
        res.render("admin/manageUser", {
            cssP: () => "css",
            scriptP: () => "scripts_manage_users",
            navP: () => "nav",
            footerP: () => "footer",
            title: "Manage User",
            isUserList: 1,
            users: accounts,
            total_users: accounts.length
        });
    } catch (error) {
        console.log("admin get /manage-users error:", error);
        res.status(400).send(error.message);
    }
});

module.exports = router;
