const express = require("express");
const router = express.Router();

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
  res.status(200).json({ balance: account[0].balance });
});

router.post("/", async (req, res) => {
  const { username, password, amount } = req.body;

  const account = await accountModel.getByUsername(username);

  if (account.balance < amount) {
    res.status(401).send("Insufficient Balance!");
  }
  //const isUser = await bcrypt.compareSync(password, account.password);
  const isUser =
    password ===
    "c349891dd5629a5a42facb063ce1ec68cfcd49baeeececd8d0ca3d6277d2d45a17db6b12f0b";

  if (isUser) {
    //proceed payment
    const time = new Date();
    const transaction = {
      amount: amount,
      createdAt: time.toISOString(),
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
      res.status(401).send("Error while creating transaction!", createdTransac.data);
    }
  } else {
    res.status(401).send("Password Incorrect!");
  }
});

module.exports = router;
