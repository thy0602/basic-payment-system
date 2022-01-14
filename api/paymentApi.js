const express = require("express");
const router = express.Router();

const bcrypt = require('bcrypt');

const accountModel = require("../models/accountModel");
const TransactionManager = require("../TransactionManager/TransactionManager");
const transactionRecordModel = require("../models/transactionRecordModel");

router.use(function (req, res, next) {
  if (req) {
    if (!req.body.username && !req.query.username)
      res.status(401).send("Need username!");
  }
  next();
});

router.get("/", async (req, res) => {
  const username = req.query.username;
  const account = await accountModel.getByUsername(username);

  if (account) {
    res.status(200).json({ balance: account[0].balance });
  } else {
    res.status(401).send("Invalid username");
  }
});

router.post("/", async (req, res) => {
  const { username, password, amount } = req.body;

  let account = await accountModel.getByUsername(username);

  account = account[0];
  if (!account) {
    return res.status(401).send("Invalid username");
  }
  if (account.balance < amount) {
    res.status(401).send("Insufficient Balance!");
  }

  const isUser = await bcrypt.compareSync(password, account.password);
  if (isUser) {
    //proceed payment
    const time = new Date();
    const transaction = {
      amount: amount,
      created_at: time.toISOString(),
      type: 1, //pay type
      username: username,
      status: "P", //pending transact
    };
    account.balance = Number(account.balance) - Number(amount);

    const createdTransac = await transactionRecordModel.createTransaction(
      transaction,
      account
    );

    if (createdTransac.isCreated) {
      const transactionManager = TransactionManager;
      transactionManager.add(createdTransac.data);
      res.status(200).send("Transaction Completed!");
    } else {
      res.status(401).send("Error while creating transaction!"+createdTransac.data);
    }
  } else {
    res.status(401).send("Password Incorrect!");
  }
});

module.exports = router;
