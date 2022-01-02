const router = require('express').Router();
const transactionRecordModel = require("../models/transactionRecordModel");
const accountModel = require("../models/accountModel");
const TransactionManager = require("../TransactionManager/TransactionManager");

router.post('/', async (req, res) => {
    if (!req.cookies.user)
        return res.redirect('/');
    
    const { amount } = req.body;
    const username = req.cookies.user;

    let account = await accountModel.getByUsername(username);
    account = account[0];

    //proceed payment
    const time = new Date();
    const transaction = {
        amount: amount,
        created_at: time.toISOString(),
        type: 0,
        username: username,
        status: "P", //pending transact
    };

    account.balance = Number(account.balance) + Number(amount);

    await accountModel.topup(transaction, account);
    res.redirect('/');
})

module.exports = router;
