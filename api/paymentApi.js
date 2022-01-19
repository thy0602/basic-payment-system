const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const salt = 10;
const jwt = require('jsonwebtoken');
const secretKey = 'ThisIsASecretKey';

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
  const { username, token, amount } = req.body;
  res.setHeader('Access-Control-Allow-Origin', '*');

  // let token = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDMxMjI5NTg0NzcsInVzZXJuYW1lIjoiSURfMDAxIn0.h96IrzcDv_fOpSu5g14_JI4Ps4Jkn6s701pr1n7iM90";
  let is_err = false;
  jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        console.log("Error 1:", err.message);
        is_err = true;
        return res.status(400).send({ error: "Unauthorized", message: "Unauthorized" });
      }

      console.log("Decoded: ", decoded);
      if (decoded.username != username) {
        is_err = true;
        return res.status(400).send({ error: "Unauthorized", message: "Invalid user" });
      }
  });
  if (is_err)
    return;

  let account = await accountModel.getByUsername(username);

  account = account[0];
  if (!account) {
    return res.status(401).send("Invalid username");
  }

  if (account.balance - amount < 0) {
    return res.status(422).send("Insufficient Balance!");
  }

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
    res.status(200).send({ message: "Transaction Completed!" });
  } else {
    res.status(422).send({ error: "Error while creating transaction!", message: createdTransac.data });
  }
});

module.exports = router;
